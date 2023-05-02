import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { ChunkContentService } from './chunk-content.service';
import { Auth } from '@/module/auth/jwt/auth.decorator';
import { UpsertChunkContentDTO } from './dto/upsert-chunkContent.dto';
import { DeleteChunkContentDTO } from './dto/delete-chunkContent.dto';

@Controller('chunk-content')
export class ChunkContentController {
    constructor(private readonly chunkContentService: ChunkContentService) {}

    @Auth()
    @Post()
    upsert(@Body() dto: UpsertChunkContentDTO) {
        return this.chunkContentService.upsert(dto);
    }

    @Delete()
    delete(@Query() dto: DeleteChunkContentDTO) {
        return this.chunkContentService.delete(dto);
    }
}
