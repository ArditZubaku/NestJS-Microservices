import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserDTO,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
