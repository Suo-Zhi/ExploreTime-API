import { Controller } from '@nestjs/common';
import { LearnerService } from './learner.service';

@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}
}
