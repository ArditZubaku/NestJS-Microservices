import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UsersDocument } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    user: UsersDocument,
    response: Response<any, Record<string, any>>,
  ) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expirationDate = new Date();
    expirationDate.setSeconds(
      expirationDate.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token: string = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expirationDate,
    });

    return token;
  }
}
