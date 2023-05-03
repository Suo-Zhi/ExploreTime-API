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
            { treeId: 1, parentNodeId: 7, order: 0, nodeId: 3 }, // 2-2-1
            { treeId: 1, parentNodeId: 7, order: 0, nodeId: 4 }, // 2-2-2
        ],
    });
};
