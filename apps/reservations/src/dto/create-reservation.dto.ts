import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { CreateChargeDTO } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReservationDTO {
  @IsDate()
  @Type(() => Date)
  @Field()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @Field()
  endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDTO) // converts the type of the property based on what you send.
  @Field(() => CreateChargeDTO)
  charge: CreateChargeDTO;
}
