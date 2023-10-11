import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly mailer: Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('SMTP_USER'),
        clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
        refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
      },
    });

  async notifyEmail({ email, text }: NotifyEmailDto): Promise<void> {
    await this.mailer.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'NestJS Microservice - Notifications',
      text,
    });
  }
}
