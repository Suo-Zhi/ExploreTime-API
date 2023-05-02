import { Body, Controller, Post } from '@nestjs/common';
import { ChunkContentService } from './chunk-content.service';
import { Auth } from '@/module/auth/jwt/auth.decorator';
import { UpsertChunkContentDTO } from './dto/upsert-chunkContent.dto';

@Controller('chunk-content')
export class ChunkContentController {
    constructor(private readonly chunkContentService: ChunkContentService) {}

    @Auth()
    @Post()
    upsert(@Body() dto: UpsertChunkContentDTO) {
        return this.chunkContentService.upsert(dto);
    }
}
