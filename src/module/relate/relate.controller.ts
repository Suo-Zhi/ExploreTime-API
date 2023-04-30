import { Controller } from '@nestjs/common';
import { RelateService } from './relate.service';

@Controller('relate')
export class RelateController {
  constructor(private readonly relateService: RelateService) {}
}
