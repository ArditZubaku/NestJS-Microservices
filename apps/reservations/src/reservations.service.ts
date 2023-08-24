import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './models/reservation.schema';
import { FlattenMaps, Types } from 'mongoose';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) paymentsService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  async findAll(): Promise<
    (FlattenMaps<ReservationDocument> &
      Required<{
        _id: Types.ObjectId;
      }>)[]
  > {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOne({
      _id,
    });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: updateReservationDto,
      },
    );
  }

  async remove(_id: string): Promise<
    FlattenMaps<ReservationDocument> &
      Required<{
        _id: Types.ObjectId;
      }>
  > {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
