import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ExplainService } from './explain.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { UpdateExplainDTO } from './dto/update-explain.dto';
import { CreateExplainDTO } from './dto/create-explain.dto';
import { Learner } from '@prisma/client';
import { FindExplainDTO } from './dto/find-explain.dto';

@Controller('explain')
export class ExplainController {
    constructor(private readonly explainService: ExplainService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindExplainDTO, @CurrentUser() user: Learner) {
        return this.explainService.findMy(dto.keywords, dto.sort, user.id);
    }

    @Get('detail:id')
    getDetail(@Param('id') id: number) {
        return this.explainService.getDetail(+id);
    }

    @Get('public')
    findPublic(@Query('keywords') keywords: string) {
        return this.explainService.findPublic(keywords);
    }

    @Auth()
    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.explainService.remove(+id);
    }

    @Auth()
    @Patch('public:id')
    toggleRefine(@Param('id') id: number, @Body('value') value: boolean) {
        return this.explainService.togglePublic(+id, value);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateExplainDTO) {
        return this.explainService.update(+id, dto);
    }

    @Auth()
    @Post()
    create(@Body() dto: CreateExplainDTO, @CurrentUser() user: Learner) {
        return this.explainService.create(dto, user.id);
    }
}
