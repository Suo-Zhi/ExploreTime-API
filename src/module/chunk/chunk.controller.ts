import { Controller, Get, Query } from '@nestjs/common';
import { ChunkService } from './chunk.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { FindChunkDTO } from './dto/find-chunk.dto';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';

@Controller('chunk')
export class ChunkController {
    constructor(private readonly chunkService: ChunkService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindChunkDTO, @CurrentUser() user: Learner) {
        return this.chunkService.findMy(dto.keywords, dto.sort, user.id);
    }
}
