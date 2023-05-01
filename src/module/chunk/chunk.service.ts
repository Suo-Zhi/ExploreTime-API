import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FindChunkDTO, SortChunk } from './dto/find-chunk.dto';

@Injectable()
export class ChunkService {
    constructor(private readonly prisma: PrismaService) {}

    async findMy(keywords: string, sort: SortChunk, userId: string) {
        const res = await this.prisma.chunk.findMany({
            where: {
                OR: [
                    { name: { contains: keywords } },
                    { preface: { contains: keywords } },
                    { endnote: { contains: keywords } },
                    {
                        ChunkContent: {
                            some: {
                                point: {
                                    OR: [{ name: { contains: keywords } }, { content: { contains: keywords } }],
                                },
                            },
                        },
                    },
                ],
                authorId: userId,
            },
            include: {
                ChunkContent: {
                    select: { order: true, point: true },
                    orderBy: { order: 'asc' },
                },
            },
            orderBy: {
                [sort.field]: sort.order,
            },
        });

        // 修改响应数据格式
        return res.map(({ ChunkContent, ...chunk }) => {
            const regExp = new RegExp(keywords);

            return {
                ...chunk,
                content: ChunkContent.map((chunkContent) => {
                    return {
                        ...chunkContent.point,
                        order: chunkContent.order,
                        isMatch:
                            keywords === ''
                                ? false
                                : regExp.test(chunkContent.point.name) || regExp.test(chunkContent.point.content),
                    };
                }),
            };
        });
    }

    remove(id: number) {
        return this.prisma.chunk.update({
            where: { id },
            data: { isDel: true },
        });
    }

    toggleRefine(id: number, value: boolean) {
        return this.prisma.chunk.update({
            where: { id },
            data: { isRefine: value },
        });
    }
}
