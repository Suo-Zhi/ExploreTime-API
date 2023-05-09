import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateReplyDTO } from './dto/create-reply.dto';

@Injectable()
export class ReplyService {
    constructor(private readonly prisma: PrismaService) {}

    getRoot(feedbackId: number) {
        return this.prisma.reply
            .findMany({
                where: {
                    feedbackId,
                    rootId: null,
                },
                orderBy: { createTime: 'asc' },
                include: {
                    _count: {
                        select: {
                            ChildReply: true,
                        },
                    },
                },
            })
            .then((res) => {
                return res.map(({ _count, ...reply }) => {
                    if (reply.isDel) {
                        reply.content = '回复内容已删除';
                        reply.authorId = '';
                    }
                    return {
                        ...reply,
                        extra: {
                            replyCount: _count.ChildReply,
                        },
                    };
                });
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
                    Author: {
                        select: {
                            id: true,
                            nickname: true,
                        },
                    },
                },
            })
            .then((res) => {
                return res.map(({ Author, Receiver, authorId, receiverId, ...reply }) => {
                    if (reply.isDel) {
                        reply.content = '回复内容已删除';
                        Author.id = '';
                    }
                    return {
                        ...reply,
                        receiver: Receiver,
                        author: Author,
                    };
                });
            });
    }

    create(dto: CreateReplyDTO, userId: string) {
        return this.prisma.reply.create({
            data: {
                content: dto.content,
                feedbackId: +dto.feedbackId,
                rootId: dto.rootId ? +dto.rootId : null,
                receiverId: dto.receiverId,
                authorId: userId,
            },
        });
    }

    remove(id: number) {
        return this.prisma.reply.update({
            where: { id },
            data: { isDel: true },
        });
    }

    delete(id: number) {
        return this.prisma.reply.delete({
            where: { id },
        });
    }
}
