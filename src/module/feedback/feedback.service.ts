import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FindFeedbackDTO } from './dto/find-feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(private readonly prisma: PrismaService) {}

    findList(dto: FindFeedbackDTO) {
        return this.prisma.feedback.findMany({
            where: {
                targetId: +dto.targetId,
                targetType: dto.targetType,
                content: { contains: dto.keywords },
            },
        });
    }
}
