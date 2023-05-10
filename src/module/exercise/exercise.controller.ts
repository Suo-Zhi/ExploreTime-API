import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { FindExerciseDTO } from './dto/find-exercise.dto';

@Controller('exercise')
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindExerciseDTO, @CurrentUser() user: Learner) {
        return this.exerciseService.findMy(dto.keywords, dto.sort, user.id);
    }

    @Auth()
    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.exerciseService.remove(+id);
    }

    @Auth()
    @Patch('refine:id')
    toggleRefine(@Param('id') id: number, @Body('value') value: boolean) {
        return this.exerciseService.toggleRefine(+id, value);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateExerciseDTO) {
        return this.exerciseService.update(+id, dto);
    }

    @Auth()
    @Post()
    create(@Body() dto: CreateExerciseDTO, @CurrentUser() user: Learner) {
        return this.exerciseService.create(dto, user.id);
    }
}
