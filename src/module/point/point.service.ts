import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/module/prisma/prisma.service';
import { SortPoint } from './dto/find-point.dto';

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
}
