import { IsNotEmpty, IsString } from 'class-validator';

export class GetUser {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
