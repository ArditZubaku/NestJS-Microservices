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
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDTO {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsStrongPassword()
  password: string;

  @Field()
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => RoleDTO)
  @Field(() => [RoleDTO], { nullable: true })
  roles?: RoleDTO[];
}
