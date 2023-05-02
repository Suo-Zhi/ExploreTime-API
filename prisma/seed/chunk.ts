import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createChunk = async (n: number) => {
    for (let i = 1; i <= n / 3; i++) {
        await prisma.chunk.create({
            data: {
                name: Random.ctitle(),
                preface: Random.csentence(0, 40),
                endnote: Random.csentence(0, 40),
                isRefine: Random.boolean(),
                authorId: 'tom',
            },
        });
    }
    await addChunkContent(n);
};

const addChunkContent = async (n: number) => {
    for (let i = 1; i <= n / 3; i++) {
        let k = 0;
        for (let j = 3 * i - 2; j <= 3 * i; j++) {
            await prisma.chunkContent.create({
                data: {
                    chunkId: i,
                    order: k,
                    pointId: j,
                },
            });
            k++;
        }
    }
};
