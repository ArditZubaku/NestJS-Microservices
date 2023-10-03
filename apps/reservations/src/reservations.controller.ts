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
import { JwtAuthGuard, Roles, UserDto } from '@app/common';
import { CurrentUser } from '@app/common';
import { Reservation } from './models/reservation.entity';
import { Observable } from 'rxjs';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ): Promise<Observable<Promise<Reservation>>> {
    return this.reservationsService.create(createReservationDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string): Promise<void> {
    return this.reservationsService.remove(+id);
  }
}
