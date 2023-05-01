import { Module } from '@nestjs/common';
import { ChunkContentService } from './chunk-content.service';
import { ChunkContentController } from './chunk-content.controller';

@Module({
  controllers: [ChunkContentController],
  providers: [ChunkContentService]
})
export class ChunkContentModule {}
