import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createInfo = async (n: number) => {
    for (let i = 0; i < n; i++) {
        await prisma.info.create({
            data: {
                content: Random.cparagraph(),
                isRefine: Random.boolean(),
                authorId: 'tom',
            },
        });
    }
};
