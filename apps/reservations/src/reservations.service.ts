import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDTO } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './models/reservation.entity';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
  User,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentsServiceClient;
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}
  async create(
    createReservationDto: CreateReservationDTO,
    { email, id: userId }: User,
  ): Promise<Observable<Promise<Reservation>>> {
    return this.paymentsService
      .createCharge({
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        // This will be executed after the response gets sent back successfully
        map((res): Promise<Reservation> => {
          return this.reservationsRepository.create(
            new Reservation({
              ...createReservationDto,
              invoiceId: res.id,
              timestamp: new Date(),
              userId,
            }),
          );
        }),
      );
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find({});
  }

  async findOne(id: number): Promise<Reservation> {
    return this.reservationsRepository.findOne({
      id,
    });
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationsRepository.findOneAndUpdate(
      {
        id,
      },
      updateReservationDto,
    );
  }

  async remove(id: number): Promise<void> {
    return this.reservationsRepository.findOneAndDelete({
      id,
    });
  }

  onModuleInit(): any {
    this.paymentsService = this.client.getService<PaymentsServiceClient>(
      PAYMENTS_SERVICE_NAME,
    );
  }
}
