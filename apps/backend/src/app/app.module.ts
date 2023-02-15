import { Module } from '@nestjs/common';
import { TrpcService } from '../trpc/trpc.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TrpcService],
})
export class AppModule {}
