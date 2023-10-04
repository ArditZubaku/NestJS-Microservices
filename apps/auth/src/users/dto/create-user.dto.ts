import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  @IsNotEmpty({
    each: true,
  })
  roles?: string[];
}
