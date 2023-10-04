import { IsNumber } from 'class-validator';

export class GetUserDTO {
  @IsNumber()
  id: number;
}
