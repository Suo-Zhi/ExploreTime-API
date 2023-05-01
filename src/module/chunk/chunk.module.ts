import { Module } from '@nestjs/common';
import { ChunkService } from './chunk.service';
import { ChunkController } from './chunk.controller';
import { ChunkContentModule } from './chunk-content/chunk-content.module';

@Module({
  controllers: [ChunkController],
  providers: [ChunkService],
  imports: [ChunkContentModule]
})
export class ChunkModule {}
