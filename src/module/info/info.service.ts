import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/module/prisma/prisma.service';
import { SortInfo } from './dto/find-info.dto';
import { CreateInfoDTO } from './dto/create-info.dto';
import { UpdateInfoDTO } from './dto/update-info.dto';

@Injectable()
export class InfoService {
    constructor(private readonly prisma: PrismaService) {}

    findMy(keywords: string, sort: SortInfo, userId: string) {
        return this.prisma.info.findMany({
            where: {
                authorId: userId,
                content: { contains: keywords },
            },
            orderBy: { [sort.field]: sort.order },
        });
    }

    create(dto: CreateInfoDTO, userId: string) {
        return this.prisma.info.create({
            data: {
                content: dto.content,
                authorId: userId,
            },
        });
    }

    remove(id: number) {
        return this.prisma.info.update({
            where: { id },
            data: { isDel: true },
        });
    }

    delete(id: number) {
        return this.prisma.info.delete({
            where: { id },
        });
    }

    toggleRefine(id: number, value: boolean) {
        return this.prisma.info.update({
            where: { id },
            data: { isRefine: value },
        });
    }

    updateContent(id: number, dto: UpdateInfoDTO) {
        return this.prisma.info.update({
            where: { id },
            data: { content: dto.content },
        });
    }
}
