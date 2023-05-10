import { Module } from '@nestjs/common';
import { ExplainService } from './explain.service';
import { ExplainController } from './explain.controller';

@Module({
  controllers: [ExplainController],
  providers: [ExplainService]
})
export class ExplainModule {}
