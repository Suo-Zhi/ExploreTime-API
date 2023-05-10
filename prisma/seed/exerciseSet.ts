import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createExerciseSet = async (n: number) => {
    for (let i = 1; i <= n / 3; i++) {
        await prisma.exerciseSet.create({
            data: {
                name: Random.ctitle(),
                preface: Random.csentence(0, 40),
                isPublic: Random.boolean(),
                authorId: 'tom',
            },
        });
    }
    await addExerciseSetContent(n);
};

const addExerciseSetContent = async (n: number) => {
    for (let i = 1; i <= n / 3; i++) {
        let k = 0;
        for (let j = 3 * i - 2; j <= 3 * i; j++) {
            await prisma.exerciseSetContent.create({
                data: {
                    setId: i,
                    order: k,
                    exerciseId: j,
                },
            });
            k++;
        }
    }
};
