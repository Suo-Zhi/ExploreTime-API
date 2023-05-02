import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpsertChunkContentDTO } from './dto/upsert-chunkContent.dto';

@Injectable()
export class ChunkContentService {
    constructor(private readonly prisma: PrismaService) {}

    upsert(dto: UpsertChunkContentDTO) {
        return this.prisma.chunkContent.upsert({
            where: {
                chunkId_order: {
                    chunkId: dto.chunkId,
                    order: dto.order,
                },
            },
            update: {
                pointId: dto.pointId,
            },
            create: {
                chunkId: dto.chunkId,
                order: dto.order,
                pointId: dto.pointId,
            },
        });
    }
}
