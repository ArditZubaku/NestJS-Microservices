import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';
import { LocalAuthGuard } from './users/guards/local-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './users/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UsersDocument,
    // Setting JWT as a HTTP cookie instead of plain text
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  // Allows us to accept incoming RPC calls
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
