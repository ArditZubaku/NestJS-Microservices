import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CardMessage } from '@app/common/types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
// The card will be of type Stripe.PaymentsMethodCreateParams.Card1 which has all these properties
export class CardDTO implements CardMessage {
  @IsString()
  @IsNotEmpty()
  @Field()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  expMonth: number;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  expYear: number;

  @IsCreditCard()
  @IsNotEmpty()
  @Field()
  number: string;
}
