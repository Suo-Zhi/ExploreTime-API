import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/module/prisma/prisma.service';
import { SortPoint } from './dto/find-point.dto';
import { UpdatePointDTO } from './dto/update-point.dto';
import { CreatePointDTO } from './dto/create-point.dto';

@Injectable()
export class PointService {
    constructor(private readonly prisma: PrismaService) {}

    findMy(keywords: string, sort: SortPoint, userId: string) {
        return this.prisma.point.findMany({
            where: {
                authorId: userId,
                OR: [{ name: { contains: keywords } }, { content: { contains: keywords } }],
            },
            orderBy: { [sort.field]: sort.order },
        });
    }

    remove(id: number) {
        return this.prisma.point.update({
            where: { id },
            data: { isDel: true },
        });
    }

    toggleRefine(id: number, value: boolean) {
        return this.prisma.point.update({
            where: { id },
            data: { isRefine: value },
        });
    }

    update(id: number, dto: UpdatePointDTO) {
        return this.prisma.point.update({
            where: { id },
            data: { ...dto },
        });
    }

    create(dto: CreatePointDTO, userId: string) {
        return this.prisma.point.create({
            data: {
                ...dto,
                authorId: userId,
            },
        });
    }
}
