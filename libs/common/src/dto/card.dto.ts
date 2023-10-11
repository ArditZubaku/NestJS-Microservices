import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CardMessage } from '@app/common/types';

// The card will be of type Stripe.PaymentsMethodCreateParams.Card1 which has all these properties
export class CardDto implements CardMessage {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  expMonth: number;

  @IsNumber()
  @IsNotEmpty()
  expYear: number;

  @IsCreditCard()
  @IsNotEmpty()
  number: string;
}
