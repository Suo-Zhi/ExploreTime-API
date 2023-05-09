import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplyService {
    constructor(private readonly prisma: PrismaService) {}

    getRoot(feedbackId: number) {
        return this.prisma.reply.findMany({
            where: {
                feedbackId,
                rootId: null,
            },
            orderBy: { createTime: 'asc' },
        });
    }

    async getChild(rootId: number) {
        return this.prisma.reply
            .findMany({
                where: { rootId },
                orderBy: { createTime: 'asc' },
                include: {
                    Receiver: {
                        select: {
                            id: true,
                            nickname: true,
                        },
                    },
                },
            })
            .then((res) => {
                return res.map(({ Receiver, receiverId, ...reply }) => {
                    return {
                        ...reply,
                        receiver: Receiver,
                    };
                });
            });
    }
}
