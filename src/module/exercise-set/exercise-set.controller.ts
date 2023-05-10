import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ExerciseSetService } from './exercise-set.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { UpdateExerciseSetDTO } from './dto/update-exerciseSet.dto';
import { CreateExerciseSetDTO } from './dto/create-exerciseSet.dto';
import { FindExerciseSetDTO } from './dto/find-exerciseSet.dto';

@Controller('exercise-set')
export class ExerciseSetController {
    constructor(private readonly exerciseSetService: ExerciseSetService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindExerciseSetDTO, @CurrentUser() user: Learner) {
        return this.exerciseSetService.findMy(dto.keywords, dto.sort, user.id);
    }

    @Get('public')
    findPublic(@Query('keywords') keywords: string) {
        return this.exerciseSetService.findPublic(keywords);
    }

    @Get(':id')
    getDetail(@Param('id') id: number) {
        return this.exerciseSetService.getDetail(+id);
    }

    @Auth()
    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.exerciseSetService.remove(+id);
    }

    @Auth()
    @Patch('public:id')
    toggleRefine(@Param('id') id: number, @Body('value') value: boolean) {
        return this.exerciseSetService.togglePublic(+id, value);
    }

    @Auth()
    @Patch('time:id')
    updateTime(@Param('id') id: number) {
        return this.exerciseSetService.updateTime(+id);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateExerciseSetDTO) {
        return this.exerciseSetService.update(+id, dto);
    }

    @Auth()
    @Post()
    create(@Body() dto: CreateExerciseSetDTO, @CurrentUser() user: Learner) {
        return this.exerciseSetService.create(dto, user.id);
    }
}
