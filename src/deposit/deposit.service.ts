// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class DepositService {}

import { Injectable } from '@nestjs/common';
import { DepositPlanDto } from './dto/deposit-plan.dto';
import { DepositDto } from './dto/deposit.dto';
import { AllocationResult } from './interfaces/allocation-result.interface';
import { allocateFunds } from './utils/fund-allocation.util';

@Injectable()
export class DepositService {
  allocateFunds(
    plans: DepositPlanDto[],
    deposits: DepositDto[],
  ): AllocationResult {
    return allocateFunds(plans, deposits);
  }
}
