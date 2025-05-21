import { DepositDto } from '../dto/deposit.dto';
import { DepositPlanDto } from '../dto/deposit-plan.dto';
import { AllocationResult } from '../interfaces/allocation-result.interface';

export function allocateFunds(
  plans: DepositPlanDto[],
  deposits: DepositDto[],
): AllocationResult {
  const result: AllocationResult = {};
  const orderedPlans = ['one-time', 'monthly'];

  // Sum amounts by plan type
  const planAmounts: Record<string, number> = {};
  const planAllocations: Record<
    string,
    { portfolio: string; amount: number }[]
  > = {};

  for (const plan of plans) {
    const type = plan.type;
    planAmounts[type] = plan.allocations.reduce((sum, p) => sum + p.amount, 0);
    planAllocations[type] = plan.allocations;
  }

  // Create a queue of deposits to process
  const depositQueue = [...deposits];

  for (const planType of orderedPlans) {
    const requiredAmount = planAmounts[planType] || 0;
    if (requiredAmount === 0) continue;

    let remaining = requiredAmount;

    while (remaining > 0 && depositQueue.length) {
      const deposit = depositQueue[0];

      const used = Math.min(remaining, deposit.amount);
      remaining -= used;
      deposit.amount -= used;

      if (deposit.amount === 0) depositQueue.shift();
    }

    if (remaining > 0)
      throw new Error(`Insufficient deposit funds for ${planType} plan`);
  }

  // Second pass: actually allocate to portfolios
  for (const planType of orderedPlans) {
    const allocations = planAllocations[planType] || [];
    for (const allocation of allocations) {
      result[allocation.portfolio] =
        (result[allocation.portfolio] || 0) + allocation.amount;
    }
  }

  // Check no deposit left unallocated
  const leftover = depositQueue.reduce((sum, d) => sum + d.amount, 0);
  if (leftover !== 0)
    throw new Error(`Deposits not fully allocated: $${leftover}`);

  return result;
}
