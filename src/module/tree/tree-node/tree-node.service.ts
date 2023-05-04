import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TreeNode } from '@prisma/client';

@Injectable()
export class TreeNodeService {
    constructor(private readonly prisma: PrismaService) {}

    async getTreeDetail(id: number) {
        return this.prisma.tree
            .findUnique({
                where: { id },
                include: {
                    TreeNode: {
                        include: {
                            Node: {
                                include: {
                                    ChunkContent: {
                                        select: { order: true, Point: true },
                                        orderBy: { order: 'asc' },
                                    },
                                },
                            },
                            ChildNode: true,
                        },
                        orderBy: { order: 'asc' },
                    },
                },
            })
            .then((tree) => {
                const nodes = tree.TreeNode;
                delete tree.TreeNode;
                return {
                    ...tree,
                    nodes: this.getChildNode(nodes),
                };
            });
    }

    getChildNode(nodes: TreeNode[], parentNodeId: number = null, deep: number = 1) {
        // 获取当前层节点
        const currentNodes = nodes.filter((node) => node.parentNodeId === parentNodeId);
        return currentNodes.map((node: any) => {
            const { ChunkContent, ...chunk } = node.Node;
            const content = ChunkContent.map((item: any) => {
                return { ...item.Point, order: item.order };
            });
            return {
                ...chunk, // 节点对应的块信息
                order: node.order, // 节点在层中的顺序
                content, // 块内容
                deep, // 层级
                nodes: this.getChildNode(nodes, node.id, deep + 1), // 子节点
            };
        });
    }
}
