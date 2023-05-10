import { Controller } from '@nestjs/common';
import { ExerciseSetContentService } from './exercise-set-content.service';

@Controller('exercise-set-content')
export class ExerciseSetContentController {
  constructor(private readonly exerciseSetContentService: ExerciseSetContentService) {}
}
