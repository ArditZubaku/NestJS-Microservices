import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDTO } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDTO) {}
