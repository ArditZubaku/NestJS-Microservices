import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UsersDocument } from './users/models/users.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: UsersDocument, response: Response<any, Record<string, any>>) {
    const tokenPayload = {
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
  }
}
