import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Reservation } from './models/reservation.entity';
import { ReservationsService } from './reservations.service';
import { CreateReservationDTO } from './dto/create-reservation.dto';
import { CurrentUser, User } from '@app/common';
import { Query } from '@nestjs/graphql';

// Resolver === HTTP Controller
@Resolver(() => Reservation) // The entity we are gonna use in this resolver
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Use mutation when u want to create/update/delete something
  @Mutation(() => Reservation)
  // The method name will be the name of the mutation in the GraphQL schema
  createReservation(
    // Basically same as @Param()
    @Args('createReservationInput')
    createReservationInput: CreateReservationDTO,
    @CurrentUser() user: User,
  ) {
    return this.reservationsService.create(createReservationInput, user);
  }

  @Query(() => [Reservation], {
    // Overrides the method name in GraphQL schema
    name: 'reservations',
  })
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Query(() => Reservation, { name: 'reservation' })
  findOne(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<Reservation> {
    return this.reservationsService.findOne(id);
  }
  //   find2(
  //     @Args('id', {
  //  /* This way is correct too */
  //       type() {
  //         return Number;
  //       },
  //     })
  //     id: number,
  //   ) {
  //     return this.reservationsService.findOne(id);
  //   }

  @Mutation(() => Reservation)
  removeReservation(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<void> {
    return this.reservationsService.remove(id);
  }
}
