import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NotifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  text: string;
}
