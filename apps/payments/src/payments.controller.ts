import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Exposing the microservice functionality to other microservices
  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe()) // Will automatically validate all the incoming data on this incoming payload => will validate using CreateChargeDto
  async createCharge(@Payload() data: CreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
