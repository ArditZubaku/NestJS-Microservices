import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, Role } from '@app/common';
import { User } from '@app/common';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
