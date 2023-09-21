import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersDocument } from '@app/common';

// Strategy for login
@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  // by default 'local'
  //   'myLocalStrategy',
) {
  constructor(private readonly usersService: UsersService) {
    // The PassportStrategy one
    super({
      usernameField: 'email',
    });
  }

  // Gets called by the extended PassportStrategy
  validate(email: string, password: string): Promise<UsersDocument> {
    try {
      // Whatever gets validated gets automatically added to the request object
      return this.usersService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
