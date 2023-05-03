import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export const createTree = async (n: number) => {
    for (let i = 1; i <= n; i++) {
        await prisma.tree.create({
            data: {
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
            { treeId: 1, order: 0, nodeId: 1 }, // 根节点
            { treeId: 1, parentNodeId: 1, order: 0, nodeId: 2 }, // 1-1
            { treeId: 1, parentNodeId: 1, order: 1, nodeId: 3 }, // 1-2
            { treeId: 1, parentNodeId: 1, order: 2, nodeId: 4 }, // 1-3
            { treeId: 1, parentNodeId: 2, order: 0, nodeId: 5 }, // 1-1-1
            { treeId: 1, parentNodeId: 2, order: 1, nodeId: 6 }, // 1-1-2
            { treeId: 1, parentNodeId: 2, order: 2, nodeId: 1 }, // 1-1-3
            { treeId: 1, parentNodeId: 7, order: 0, nodeId: 2 }, // 1-1-3-1
            { treeId: 1, parentNodeId: 3, order: 0, nodeId: 3 }, // 1-2-1
        ],
    });
};
