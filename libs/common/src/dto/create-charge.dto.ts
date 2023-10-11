import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './card.dto';
import { Type } from 'class-transformer';
import { CreateChargeMessage } from '@app/common/types';

export class CreateChargeDto implements Omit<CreateChargeMessage, 'email'> {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested() // Validates the properties of the object
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
