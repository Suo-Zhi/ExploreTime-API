import { Module } from '@nestjs/common';
import { TreeNodeService } from './tree-node.service';
import { TreeNodeController } from './tree-node.controller';

@Module({
  controllers: [TreeNodeController],
  providers: [TreeNodeService]
})
export class TreeNodeModule {}
