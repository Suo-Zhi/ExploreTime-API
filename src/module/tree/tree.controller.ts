import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { TreeService } from './tree.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { FindTreeDTO } from './dto/find-tree.dto';

@Controller('tree')
export class TreeController {
    constructor(private readonly treeService: TreeService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindTreeDTO, @CurrentUser() user: Learner) {
        return this.treeService.findMy(dto.keywords, dto.sort, user.id);
    }

    @Auth()
    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.treeService.remove(+id);
    }
}
