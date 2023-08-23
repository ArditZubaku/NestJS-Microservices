import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './models/reservation.schema';
import { FlattenMaps, Types } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  findAll(): Promise<
    (FlattenMaps<ReservationDocument> &
      Required<{
        _id: Types.ObjectId;
      }>)[]
  > {
    return this.reservationsRepository.find({});
  }

  findOne(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOne({
      _id,
    });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: updateReservationDto,
      },
    );
  }

  remove(_id: string): Promise<
    FlattenMaps<ReservationDocument> &
      Required<{
        _id: Types.ObjectId;
      }>
  > {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
