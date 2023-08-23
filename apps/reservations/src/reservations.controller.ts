import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';
import { FlattenMaps, Types } from 'mongoose';
import { JwtAuthGuard } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll(): Promise<
    (FlattenMaps<ReservationDocument> &
      Required<{
        _id: Types.ObjectId;
      }>)[]
  > {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReservationDocument> {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<
    FlattenMaps<ReservationDocument> &
      Required<{
        _id: Types.ObjectId;
      }>
  > {
    return this.reservationsService.remove(id);
  }
}
