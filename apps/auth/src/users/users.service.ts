import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDocument } from './models/users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  createUser(dto: CreateUserDto): Promise<UsersDocument> {
    return this.usersRepository.create(dto);
  }
}
