import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UsersDocument } from '../users/models/users.schema';

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
          request?.cookies?.Authentication || request?.Authentication,
      ]),
      // The value that it will use to decode it and verify the cookie
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Whatever we return from this gets populated into the request object
  async validate({ userId }: TokenPayload): Promise<UsersDocument> {
    return this.usersService.getUser({ _id: userId });
  }
}
