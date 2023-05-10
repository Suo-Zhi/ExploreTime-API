import { Module } from '@nestjs/common';
import { ExerciseSetContentService } from './exercise-set-content.service';
import { ExerciseSetContentController } from './exercise-set-content.controller';

@Module({
  controllers: [ExerciseSetContentController],
  providers: [ExerciseSetContentService]
})
export class ExerciseSetContentModule {}
