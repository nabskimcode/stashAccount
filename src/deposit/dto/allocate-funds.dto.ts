import { Type } from 'class-transformer';
import { ValidateNested, ArrayNotEmpty, IsArray } from 'class-validator';
import { DepositPlanDto } from './deposit-plan.dto';
import { DepositDto } from './deposit.dto';

export class AllocateFundsDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one deposit plan is required' })
  @ValidateNested({ each: true })
  @Type(() => DepositPlanDto)
  plans: DepositPlanDto[];

  @IsArray()
  @ArrayNotEmpty({ message: 'At least one deposit is required' })
  @ValidateNested({ each: true })
  @Type(() => DepositDto)
  deposits: DepositDto[];
}
