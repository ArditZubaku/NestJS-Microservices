import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  CurrentUser,
} from '@app/common';
import { User } from '@app/common';
import { Response } from 'express';
import { LocalAuthGuard } from './users/guards/local-auth.guard';
import { Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './users/guards/jwt-auth.guard';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    // Setting JWT as an HTTP cookie instead of plain text
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const jwt: string = await this.authService.login(user, response);
    response.send(jwt);
  }

  @UseGuards(JwtAuthGuard) // The user is provided by the jwt strategy
  // In this case we gotta use the @Payload() bc it doesnt expect this to be coming in from our local strategy
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
