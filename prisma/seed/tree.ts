import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createTree = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.tree.create({
            data: {
                name: Random.ctitle(),
                preface: Random.csentence(0, 40),
                authorId: 'tom',
            },
        });
    }
    await addTreeNode();
    await addFeedback(n);
};

const addTreeNode = async () => {
    await prisma.treeNode.createMany({
        data: [
            { treeId: 1, parentNodeId: null, order: 0, nodeId: 1 }, // 1
            { treeId: 1, parentNodeId: null, order: 1, nodeId: 2 }, // 2
            { treeId: 1, parentNodeId: 1, order: 0, nodeId: 3 }, // 1-1
            { treeId: 1, parentNodeId: 1, order: 1, nodeId: 4 }, // 1-2

            { treeId: 1, parentNodeId: 1, order: 2, nodeId: 5 }, // 1-3
            { treeId: 1, parentNodeId: 2, order: 0, nodeId: 6 }, // 2-1
            { treeId: 1, parentNodeId: 2, order: 1, nodeId: 1 }, // 2-2
            { treeId: 1, parentNodeId: 2, order: 2, nodeId: 2 }, // 2-3

            { treeId: 1, parentNodeId: 3, order: 0, nodeId: 3 }, // 1-1-1
            { treeId: 1, parentNodeId: 3, order: 1, nodeId: 4 }, // 1-1-2
            { treeId: 1, parentNodeId: 9, order: 0, nodeId: 4 }, // 1-1-1-1
            { treeId: 1, parentNodeId: 9, order: 1, nodeId: 4 }, // 1-1-1-2

            { treeId: 1, parentNodeId: 12, order: 0, nodeId: 4 }, // 1-1-1-1-1

            { treeId: 1, parentNodeId: null, order: 2, nodeId: 3 }, // 3
        ],
    });
};

const addFeedback = async (n: number) => {
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
