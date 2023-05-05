import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TreeNodeService } from './tree-node.service';
import { Auth } from '@/module/auth/jwt/auth.decorator';
import { UpsertTreeNodeDTO } from './dto/upsert-treeNode.dto';

@Controller('tree-node')
export class TreeNodeController {
    constructor(private readonly treeNodeService: TreeNodeService) {}

    @Get(':id')
    getTreeDetail(@Param('id') id: number) {
        return this.treeNodeService.getTreeDetail(+id);
    }

    @Auth()
    @Patch(':id')
    upsert(@Param('id') id: number, @Body() dto: UpsertTreeNodeDTO) {
        return this.treeNodeService.upsert(+id, dto);
    }
}
