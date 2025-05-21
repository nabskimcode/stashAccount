import { Body, Controller, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { AllocateFundsDto } from './dto/allocate-funds.dto';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('allocateFunds')
  allocateFunds(@Body() body: AllocateFundsDto) {
    return this.depositService.allocateFunds(body.plans, body.deposits);
  }
}
