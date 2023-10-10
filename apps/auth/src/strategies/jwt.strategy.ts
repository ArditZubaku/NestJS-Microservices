import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { User } from '@app/common';

@Injectable()
// Importing jwt one
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // Tell the strategy where the JWT lives
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          // From express or RPC
          request?.cookies?.Authentication ||
          request?.Authentication ||
          // In our case with gRPC there are no headers, so we gotta check first
          request?.headers?.Authentication,
      ]),
      // The value that it will use to decode it and verify the cookie
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Whatever we return from this gets populated into the request object
  async validate({ userId }: TokenPayload): Promise<User> {
    return this.usersService.getUser({ id: userId });
  }
}
