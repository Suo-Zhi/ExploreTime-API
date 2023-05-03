import { Controller } from '@nestjs/common';
import { TreeNodeService } from './tree-node.service';

@Controller('tree-node')
export class TreeNodeController {
  constructor(private readonly treeNodeService: TreeNodeService) {}
}
