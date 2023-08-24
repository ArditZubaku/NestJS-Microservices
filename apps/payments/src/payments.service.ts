import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16',
    },
  );

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      // References the paymentMethod above, so it charges its card correctly
      payment_method: paymentMethod.id,
      amount: amount * 100, // Cents -> Euro
      confirm: true, // charge the user immediately
      payment_method_types: ['card'],
      currency: 'eur',
    });

    return paymentIntent;
  }
}
