import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PointService } from './point.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { FindPointDTO } from './dto/find-point.dto';
import { Learner } from '@prisma/client';
import { UpdatePointDTO } from './dto/update-point.dto';
import { CreatePointDTO } from './dto/create-point.dto';

@Controller('point')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindPointDTO, @CurrentUser() user: Learner) {
        return this.pointService.findMy(dto.keywords, dto.sort, user.id);
    }

    @Auth()
    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.pointService.remove(+id);
    }

    @Auth()
    @Patch('refine:id')
    toggleRefine(@Param('id') id: number, @Body('value') value: boolean) {
        return this.pointService.toggleRefine(+id, value);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdatePointDTO) {
        return this.pointService.update(+id, dto);
    }

    @Auth()
    @Post()
    create(@Body() dto: CreatePointDTO, @CurrentUser() user: Learner) {
        return this.pointService.create(dto, user.id);
    }
}
