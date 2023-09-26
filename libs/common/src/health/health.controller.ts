import { Controller, Get } from '@nestjs/common';

@Controller({
  path: '/',
})
export class HealthController {
  @Get()
  health() {
    return true;
  }
}
