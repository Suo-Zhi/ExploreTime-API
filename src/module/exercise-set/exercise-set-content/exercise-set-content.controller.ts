import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { ExerciseSetContentService } from './exercise-set-content.service';
import { Auth } from '@/module/auth/jwt/auth.decorator';
import { UpsertExerciseSetContentDTO } from './dto/upsert-exerciseSetContent.dto';
import { DeleteExerciseSetContentDTO } from './dto/delete-exerciseSetContent.dto';

@Controller('exercise-set-content')
export class ExerciseSetContentController {
    constructor(private readonly exerciseSetContentService: ExerciseSetContentService) {}

    @Auth()
    @Post()
    upsert(@Body() dto: UpsertExerciseSetContentDTO) {
        return this.exerciseSetContentService.upsert(dto);
    }

    @Delete()
    delete(@Query() dto: DeleteExerciseSetContentDTO) {
        return this.exerciseSetContentService.delete(dto);
    }
}
