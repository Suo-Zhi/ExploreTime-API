import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';
import { TreeNodeModule } from './tree-node/tree-node.module';

@Module({
  controllers: [TreeController],
  providers: [TreeService],
  imports: [TreeNodeModule]
})
export class TreeModule {}
