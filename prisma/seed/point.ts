import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createPoint = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.point.create({
            data: {
                name: Random.ctitle(),
                content: Random.cparagraph(),
                isRefine: Random.boolean(),
                authorId: 'tom',
            },
        });
    }
};
