import { Controller } from '@nestjs/common';
import { ChunkService } from './chunk.service';

@Controller('chunk')
export class ChunkController {
  constructor(private readonly chunkService: ChunkService) {}
}
