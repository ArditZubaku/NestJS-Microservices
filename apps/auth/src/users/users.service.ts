import { UsersRepository } from './users.repository';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDocument } from './models/users.schema';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(dto: CreateUserDto): Promise<UsersDocument> {
    await this.validateCreateUserDto(dto);
    return this.usersRepository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 15),
    });
  }
  private async validateCreateUserDto(dto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({
        email: dto.email,
      });
    } catch (error) {
      // If it does not exist, proceed with the creation, get out of this method
      return;
    }

    // If user exists
    throw new UnprocessableEntityException('Email already exists');
  }

  async verifyUser(email: string, password: string): Promise<UsersDocument> {
    const user: UsersDocument = await this.usersRepository.findOne({
      email,
    });

    const passwordIsValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordIsValid)
      throw new UnauthorizedException('Credentials are not valid!');

    return user;
  }

  getUser(dto: GetUserDto) {
    // return this.usersRepository.findOne({
    //   _id: dto._id,
    // });
    return this.usersRepository.findOne(dto);
  }

  getAllUsers() {
    return this.usersRepository.find({});
  }
}
