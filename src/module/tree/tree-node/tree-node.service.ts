import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TreeNode } from '@prisma/client';
import { UpsertTreeNodeDTO } from './dto/upsert-treeNode.dto';
import { plainToClass } from 'class-transformer';

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

    getChildNode(nodes: TreeNode[], parentNodeId: number = null, deep: number = 1, parentPrefix: string = '') {
        // 获取当前层节点
        const currentNodes = nodes.filter((node) => node.parentNodeId === parentNodeId);
        return currentNodes.map((node: any) => {
            // 获取节点标题前缀
            const prefix = this.getNodeLevel(deep, node.order, parentPrefix);
            // 整理块信息
            const { ChunkContent, ...chunk } = node.Node;
            const content = ChunkContent.map((item: any) => {
                return { ...item.Point, order: item.order };
            });
            return {
                ...chunk, // 节点对应的块信息
                content, // 块内容

                node: {
                    id: node.id, // 节点Id
                    treeId: node.treeId, // 所在树Id
                    parentId: node.parentNodeId, // 父节点Id
                    order: node.order, // 节点在层中的顺序
                    children: this.getChildNode(nodes, node.id, deep + 1, prefix), // 子节点
                },

                level: {
                    deep, // 节点层级
                    prefix, // 节点标题前缀
                },
            };
        });
    }

    getNodeLevel(deep: number, order: number, parentPrefix: string = '') {
        const firstLevel = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'];
        switch (deep) {
            case 1:
                return firstLevel[order] + '、';
            case 2:
                return order + 1 + '.';
            case 3:
                return parentPrefix + (order + 1);
            default:
                return parentPrefix + '.' + (order + 1);
        }
    }

    upsert(id: number, dto: UpsertTreeNodeDTO) {
        dto = plainToClass(UpsertTreeNodeDTO, dto);

        return this.prisma.treeNode.upsert({
            where: { id },
            update: {
                ...dto,
            },
            create: {
                treeId: +dto.treeId,
                parentNodeId: +dto.parentNodeId,
                order: +dto.order,
                nodeId: +dto.nodeId,
            },
        });
    }
}
