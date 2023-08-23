import { CreateUserDto } from './dto/create-user.dto';
import { UsersDocument } from './models/users.schema';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UsersDocument> {
    return this.usersService.createUser(dto);
  }
}
