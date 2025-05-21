import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepositController } from './deposit/deposit.controller';
import { DepositService } from './deposit/deposit.service';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [DepositModule],
  controllers: [AppController, DepositController],
  providers: [AppService, DepositService],
})
export class AppModule {}
