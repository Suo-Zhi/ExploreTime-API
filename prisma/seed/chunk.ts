import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createChunk = async (n: number) => {
    await addTestChunk();
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
    await relateChunk(n / 3);
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

const relateChunk = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.relate.createMany({
            data: [
                {
                    targetId: i,
                    targetType: 'chunk',
                    relateId: i + 1 <= n ? i + 1 : 1,
                    relateType: 'chunk',
                },
                {
                    targetId: i,
                    targetType: 'chunk',
                    relateId: i + 2 <= n ? i + 2 : 2,
                    relateType: 'chunk',
                },
                {
                    targetId: i,
                    targetType: 'chunk',
                    relateId: i + 3 <= n ? i + 3 : 3,
                    relateType: 'chunk',
                },
            ],
        });
    }
};

const addTestChunk = async () => {
    await prisma.chunk.create({
        data: {
            name: 'g',
            preface: '',
            endnote: '',
            isRefine: false,
            authorId: 'tom',
        },
    });
    await prisma.chunk.create({
        data: {
            name: 'f',
            preface: '',
            endnote: '',
            isRefine: false,
            authorId: 'tom',
        },
    });
    await prisma.chunk.create({
        data: {
            name: 'e',
            preface: '',
            endnote: '',
            isRefine: false,
            authorId: 'tom',
        },
    });
    await prisma.chunk.create({
        data: {
            name: 'd',
            preface: '',
            endnote: '',
            isRefine: false,
            authorId: 'tom',
        },
    });
    await prisma.chunk.create({
        data: {
            name: 'c',
            preface: '',
            endnote: '',
            isRefine: false,
            authorId: 'tom',
        },
    });
    await prisma.chunk.create({
        data: {
            name: 'b',
            preface: '',
            endnote: '',
            isRefine: false,
            authorId: 'tom',
        },
    });
    await prisma.chunk.create({
        data: {
            name: 'a',
            preface: '',
            endnote: '',
            isRefine: false,
            authorId: 'tom',
        },
    });
};
