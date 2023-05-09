import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FindFeedbackDTO } from './dto/find-feedback.dto';
import { CreateFeedbackDTO } from './dto/create-feeback.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FeedbackService {
    constructor(private readonly prisma: PrismaService) {}

    async findList(dto: FindFeedbackDTO) {
        return this.prisma.feedback
            .findMany({
                where: {
                    targetId: +dto.targetId,
                    targetType: dto.targetType,
                    content: { contains: dto.keywords },
                },
                orderBy: { createTime: 'desc' },
                include: {
                    _count: {
                        select: {
                            Reply: true,
                        },
                    },
                },
            })
            .then((res) => {
                return res.map(({ _count, ...feedback }) => {
                    if (feedback.isDel) {
                        feedback.content = '反馈内容已删除';
                        feedback.authorId = '';
                    }
                    return {
                        ...feedback,
                        extra: {
                            replyCount: _count.Reply,
                        },
                    };
                });
            });
    }

    create(dto: CreateFeedbackDTO, userId: string) {
        dto = plainToClass(CreateFeedbackDTO, dto);
        return this.prisma.feedback.create({
            data: { ...dto, authorId: userId },
        });
    }

    remove(id: number) {
        return this.prisma.feedback.update({
            where: { id },
            data: { isDel: true },
        });
    }

    delete(id: number) {
        return this.prisma.feedback.delete({
            where: { id },
        });
    }
}
