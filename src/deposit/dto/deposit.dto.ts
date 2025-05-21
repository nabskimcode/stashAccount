import { IsNumber, IsString, Min } from 'class-validator';

export class DepositDto {
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount must be at least 0' })
  amount: number;

  @IsString({ message: 'Reference must be a string' })
  reference: string;
}
