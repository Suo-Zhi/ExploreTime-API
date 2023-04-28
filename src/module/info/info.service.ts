import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/module/prisma/prisma.service';
import { SortInfo } from './dto/find-info.dto';

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
}
