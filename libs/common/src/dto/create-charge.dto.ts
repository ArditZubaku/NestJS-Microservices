import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CardDTO } from './card.dto';
import { Type } from 'class-transformer';
import { CreateChargeMessage } from '@app/common/types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChargeDTO implements Omit<CreateChargeMessage, 'email'> {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested() // Validates the properties of the object
  @Type(() => CardDTO)
  // GraphQL can only tell on primitive types, the complex ones we gotta tell it what are we gonna return
  @Field(() => CardDTO)
  card: CardDTO;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  amount: number;
}
