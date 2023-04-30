import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FindRelateDTO } from './dto/find-relate.dto';

@Injectable()
export class RelateService {
    constructor(private readonly prisma: PrismaService) {}

    async findRelate(dto: FindRelateDTO) {
        const relations = await this.prisma.relate
            .findMany({
                where: {
                    targetId: +dto.targetId,
                    targetType: dto.targetType,
                    relateType: dto.relateType,
                },
                select: {
                    relateId: true,
                },
            })
            .then((res) => {
                return res.map((relation) => {
                    return relation.relateId;
                });
            });

        return await this.prisma[dto.relateType].findMany({
            where: {
                id: { in: relations },
                OR: [{ name: { contains: dto.keywords } }, { content: { contains: dto.keywords } }],
            },
        });
    }
}
