import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import {
  NotificationsServiceController,
  NotificationsServiceControllerMethods,
} from '@app/common';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe()) // Applying validation based on DTOs
  async notifyEmail(data: NotifyEmailDto): Promise<void> {
    await this.notificationsService.notifyEmail(data);
  }
}
