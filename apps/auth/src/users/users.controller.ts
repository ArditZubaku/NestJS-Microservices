import { CurrentUser, User } from '@app/common';
import { CreateUser } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUser): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
