import { UsersRepository } from './users.repository';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { Role, User } from '@app/common';
import * as bcrypt from 'bcryptjs';
import { GetUserDTO } from './dto/get-user.dto';
import { RoleDTO } from './dto/role.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    await this.validateCreateUser(dto);
    const user: User = new User({
      ...dto,
      roles: dto.roles?.map((roleDTO: RoleDTO): Role => new Role(roleDTO)),
      password: await bcrypt.hash(dto.password, 15),
    });
    return this.usersRepository.create(user);
  }
  private async validateCreateUser(dto: CreateUserDTO) {
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

  async verifyUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
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

  async getUser(dto: GetUserDTO) {
    return this.usersRepository.findOne(dto, { roles: true });
  }

  async getAllUsers() {
    return this.usersRepository.find({});
  }
}
