import { Controller } from '@nestjs/common';
import { ExplainService } from './explain.service';

@Controller('explain')
export class ExplainController {
  constructor(private readonly explainService: ExplainService) {}
}
