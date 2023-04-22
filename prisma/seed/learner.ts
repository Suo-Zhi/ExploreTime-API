import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import { hash } from 'argon2';

const prisma = new PrismaClient();

export const createLearner = async (n: number) => {
    await prisma.learner.create({
        data: {
            id: 'tom',
            username: 'Tom',
            password: await hash('123'),
            intro: Random.ctitle(0, 30),
            avatar: Random.image('140x140', randomAvatarColor(), 'T'),
        },
    });
    await prisma.learner.create({
        data: {
            id: 'jerry',
            username: 'Jerry',
            password: await hash('123'),
            intro: Random.ctitle(0, 30),
            avatar: Random.image('140x140', randomAvatarColor(), 'J'),
        },
    });
    for (let i = 0; i < n - 2; i++) {
        const username = Random.string(1, 15);
        await prisma.learner.create({
            data: {
                id: Random.string('lower', 1, 20),
                username,
                password: await hash(Random.string(1, 20)),
                intro: Random.ctitle(0, 30),
                avatar: Random.image('140x140', randomAvatarColor(), username.substring(0, 1)),
            },
        });
    }
};

// 随机生成浅色系头像
const randomAvatarColor = () => {
    return (
        '#' +
        Random.integer(180, 255).toString(16) +
        Random.integer(140, 255).toString(16) +
        Random.integer(120, 220).toString(16)
    );
};
