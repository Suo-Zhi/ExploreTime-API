import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FindRelateDTO } from './dto/find-relate.dto';
import { DelRelateDTO } from './dto/del-relate.dto';
import { plainToClass } from 'class-transformer';
import { CreateRelateDTO } from './dto/create-relate.dto';

@Injectable()
export class RelateService {
    constructor(private readonly prisma: PrismaService) {}

    // 查询指定类型的关联项
    async findType(dto: FindRelateDTO) {
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

    delete(dto: DelRelateDTO) {
        dto = plainToClass(DelRelateDTO, dto);
        return this.prisma.relate.delete({
            where: {
                targetId_targetType_relateId_relateType: { ...dto },
            },
        });
    }

    create(dto: CreateRelateDTO) {
        return this.prisma.relate.create({
            data: { ...dto },
        });
    }
}
