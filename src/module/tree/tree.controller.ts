import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TreeService } from './tree.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { FindTreeDTO } from './dto/find-tree.dto';
import { UpdateTreeDTO } from './dto/update-tree.dto';
import { CreateTreeDTO } from './dto/create-tree.dto';

@Controller('tree')
export class TreeController {
    constructor(private readonly treeService: TreeService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindTreeDTO, @CurrentUser() user: Learner) {
        return this.treeService.findMy(dto.keywords, dto.sort, user.id);
    }

    @Get('public')
    findPublic(@Query('keywords') keywords: string) {
        return this.treeService.findPublic(keywords);
    }

    @Auth()
    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.treeService.remove(+id);
    }

    @Auth()
    @Patch('public:id')
    toggleRefine(@Param('id') id: number, @Body('value') value: boolean) {
        return this.treeService.togglePublic(+id, value);
    }

    @Auth()
    @Patch('time:id')
    updateTime(@Param('id') id: number) {
        return this.treeService.updateTime(+id);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateTreeDTO) {
        return this.treeService.update(+id, dto);
    }

    @Auth()
    @Post()
    create(@Body() dto: CreateTreeDTO, @CurrentUser() user: Learner) {
        return this.treeService.create(dto, user.id);
    }
}
