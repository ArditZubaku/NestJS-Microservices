import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common';

@Controller()
// By using this decorator, TS Proto will automatically add all the necessary
// metadata to our methods
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe()) // Will automatically validate all the incoming data on this incoming payload => will validate using CreateChargeDto
  async createCharge(data: PaymentsCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
