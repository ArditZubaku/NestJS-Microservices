import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// The card will be of type Stripe.PaymentsMethodCreateParams.Card1 which has all these properties
export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsCreditCard()
  @IsNotEmpty()
  number: string;
}
