import { Controller } from '@nestjs/common';
import { ChunkContentService } from './chunk-content.service';

@Controller('chunk-content')
export class ChunkContentController {
  constructor(private readonly chunkContentService: ChunkContentService) {}
}
