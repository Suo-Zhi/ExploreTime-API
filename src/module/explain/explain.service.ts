import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SortExplain } from './dto/find-explain.dto';
import { UpdateExplainDTO } from './dto/update-explain.dto';
import { CreateExplainDTO } from './dto/create-explain.dto';

@Injectable()
export class ExplainService {
    constructor(private readonly prisma: PrismaService) {}

    findMy(keywords: string, sort: SortExplain, userId: string) {
        return this.prisma.explain.findMany({
            where: {
                authorId: userId,
                OR: [{ title: { contains: keywords } }, { content: { contains: keywords } }],
                isDel: false,
            },
            orderBy: { [sort.field]: sort.order },
        });
    }

    getDetail(id: number) {
        return this.prisma.explain.findUnique({
            where: { id },
        });
    }

    async findPublic(keywords: string) {
        return this.prisma.explain.findMany({
            where: {
                OR: [{ title: { contains: keywords } }, { content: { contains: keywords } }],
                isPublic: true,
                isDel: false,
            },
            orderBy: { createTime: 'desc' },
        });
    }

    remove(id: number) {
        return this.prisma.explain.update({
            where: { id },
            data: { isDel: true },
        });
    }

    togglePublic(id: number, value: boolean) {
        return this.prisma.explain.update({
            where: { id },
            data: { isPublic: value },
        });
    }

    update(id: number, dto: UpdateExplainDTO) {
        return this.prisma.explain.update({
            where: { id },
            data: { ...dto },
        });
    }

    create(dto: CreateExplainDTO, userId: string) {
        return this.prisma.explain.create({
            data: {
                ...dto,
                authorId: userId,
            },
        });
    }
}
