import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createExplain = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.explain.create({
            data: {
                title: Random.ctitle(),
                content: Random.cparagraph(),
                isPublic: Random.boolean(),
                authorId: 'tom',
            },
        });
    }
};
