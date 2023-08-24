import { IsEmail, IsNotEmpty } from 'class-validator';

export class NotifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
