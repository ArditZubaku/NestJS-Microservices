import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './models/reservation.schema';
import { FlattenMaps, Types } from 'mongoose';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentsService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        // This will be executed after the response gets sent back successfully
        map((res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
        }),
      );
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
