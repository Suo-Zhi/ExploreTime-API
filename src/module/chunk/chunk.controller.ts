import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ChunkService } from './chunk.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { FindChunkDTO } from './dto/find-chunk.dto';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { UpdateChunkDTO } from './dto/update-chunk.dto';

@Controller('chunk')
export class ChunkController {
    constructor(private readonly chunkService: ChunkService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindChunkDTO, @CurrentUser() user: Learner) {
        return this.chunkService.findMy(dto.keywords, dto.sort, user.id);
    }

    @Auth()
    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.chunkService.remove(+id);
    }

    @Auth()
    @Patch('refine:id')
    toggleRefine(@Param('id') id: number, @Body('value') value: boolean) {
        return this.chunkService.toggleRefine(+id, value);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateChunkDTO) {
        return this.chunkService.update(+id, dto);
    }
}
