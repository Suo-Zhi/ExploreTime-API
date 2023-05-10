import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createExercise = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.exercise.create({
            data: {
                question: Random.ctitle(),
                detail: Random.csentence(0, 40),
                answer: Random.csentence(0, 40),
                analysis: Random.csentence(0, 40),
                isRefine: Random.boolean(),
                authorId: 'tom',
            },
        });
    }
};
