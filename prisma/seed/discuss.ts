import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createDiscuss = async (n: number) => {
    await createFeedback(n);
    await createReply(n);
    await createChildReply(n);
};

const createFeedback = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.feedback.create({
            data: {
                targetId: i,
                targetType: 'tree',
                content: Random.csentence(0, 40),
                authorId: 'jerry',
            },
        });
    }
};

const createReply = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.reply.create({
            data: {
                content: Random.csentence(0, 40),
                feedbackId: i,
                authorId: 'tom',
            },
        });
    }
};

const createChildReply = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.reply.create({
            data: {
                content: Random.csentence(0, 40),
                feedbackId: 1,
                rootId: i,
                authorId: 'tom',
            },
        });
        await prisma.reply.create({
            data: {
                content: Random.csentence(0, 40),
                feedbackId: 1,
                rootId: i,
                receiverId: 'tom',
                authorId: 'jerry',
            },
        });
    }
};
