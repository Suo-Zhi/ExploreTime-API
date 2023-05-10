import { Controller } from '@nestjs/common';
import { ExerciseSetService } from './exercise-set.service';

@Controller('exercise-set')
export class ExerciseSetController {
  constructor(private readonly exerciseSetService: ExerciseSetService) {}
}
