import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { RoleDTO } from './role.dto';
import { Type } from 'class-transformer';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => RoleDTO)
  roles?: RoleDTO[];
}
