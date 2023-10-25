import { CreateChargeDTO } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentsCreateChargeDto extends CreateChargeDTO {
  @IsEmail()
  email: string;
}
