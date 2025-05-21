import {
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  Min,
  IsIn,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class AllocationDto {
  @IsString({ message: 'Portfolio must be a string' })
  portfolio: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount must be at least 0' })
  amount: number;
}

export class DepositPlanDto {
  @IsIn(['one-time', 'monthly'], {
    message: 'Type must be "one-time" or "monthly"',
  })
  type: 'one-time' | 'monthly';

  @IsArray()
  @ArrayNotEmpty({ message: 'Allocations must not be empty' })
  @ValidateNested({ each: true })
  @Type(() => AllocationDto)
  allocations: AllocationDto[];
}
