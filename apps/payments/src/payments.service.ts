import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private notificationsService: NotificationsServiceClient;
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16',
    },
  );

  async createCharge({ /* card */ amount, email }: PaymentsCreateChargeDto) {
    // const paymentMethod: Stripe.Response<Stripe.PaymentMethod> =
    // await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card: {
    //     cvc: card.cvc,
    //     number: card.number,
    //     exp_month: card.expMonth,
    //     exp_year: card.expYear,
    //   },
    // });

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripe.paymentIntents.create({
        // References the paymentMethod above, so it charges its card correctly
        // payment_method: paymentMethod.id, // Commented it out to use the ones that test card that Stripe offers instead of our custom one.
        amount: amount * 100, // Cents -> Euro
        confirm: true, // charge the user immediately
        // payment_method_types: ['card'], // Reason above
        currency: 'eur',
        payment_method: 'pm_card_visa', // The Stripe one
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });

    // So, the initialization can be done even on runtime, not just onModuleInit
    if (!this.notificationsService)
      this.notificationsService =
        this.client.getService<NotificationsServiceClient>(
          NOTIFICATIONS_SERVICE_NAME,
        );
    this.notificationsService
      .notifyEmail({
        email,
        text: `Your payment of $${amount} has completed successfully!`,
      })
      // Only if we subscribe to it, it gets executed
      .subscribe((): void => {});

    return paymentIntent;
  }
}
