import { Controller, Get, Param } from '@nestjs/common';
import { TreeNodeService } from './tree-node.service';

@Controller('tree-node')
export class TreeNodeController {
    constructor(private readonly treeNodeService: TreeNodeService) {}

    @Get(':id')
    getTreeDetail(@Param('id') id: number) {
        return this.treeNodeService.getTreeDetail(+id);
    }
}
