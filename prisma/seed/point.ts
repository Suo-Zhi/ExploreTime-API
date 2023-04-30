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

    await relatePoint(n);
};

const relatePoint = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.relate.createMany({
            data: [
                {
                    targetId: i,
                    targetType: 'point',
                    relateId: i + 1 <= n ? i + 1 : 1,
                    relateType: 'point',
                },
                {
                    targetId: i,
                    targetType: 'point',
                    relateId: i + 2 <= n ? i + 2 : 2,
                    relateType: 'point',
                },
                {
                    targetId: i,
                    targetType: 'point',
                    relateId: i + 3 <= n ? i + 3 : 3,
                    relateType: 'point',
                },

                {
                    targetId: i,
                    targetType: 'point',
                    relateId: i + 1 <= n ? i + 1 : 1,
                    relateType: 'chunk',
                },
                {
                    targetId: i,
                    targetType: 'point',
                    relateId: i + 2 <= n ? i + 2 : 2,
                    relateType: 'chunk',
                },
                {
                    targetId: i,
                    targetType: 'point',
                    relateId: i + 3 <= n ? i + 3 : 3,
                    relateType: 'tree',
                },
            ],
        });
    }
};
