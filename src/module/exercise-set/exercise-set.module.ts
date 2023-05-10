import { Module } from '@nestjs/common';
import { ExerciseSetService } from './exercise-set.service';
import { ExerciseSetController } from './exercise-set.controller';
import { ExerciseSetContentModule } from './exercise-set-content/exercise-set-content.module';

@Module({
  controllers: [ExerciseSetController],
  providers: [ExerciseSetService],
  imports: [ExerciseSetContentModule]
})
export class ExerciseSetModule {}
