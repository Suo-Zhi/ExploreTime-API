import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SortTree } from './dto/find-tree.dto';
import { UpdateTreeDTO } from './dto/update-tree.dto';
import { CreateTreeDTO } from './dto/create-tree.dto';

@Injectable()
export class TreeService {
    constructor(private readonly prisma: PrismaService) {}

    async findMy(keywords: string, sort: SortTree, userId: string) {
        let list = [];

        // 搜索树
        const trees = await this.prisma.tree.findMany({
            where: {
                OR: [{ name: { contains: keywords } }, { preface: { contains: keywords } }],
                authorId: userId,
            },
            orderBy: { [sort.field]: sort.order },
        });

        // 统计知识块和知识点
        for (let i = 0; i < trees.length; i++) {
            const chunkTotal = await this.prisma.treeNode.count({
                where: { treeId: trees[i].id },
            });
            const pointTotal = await this.prisma.point.count({
                where: {
                    ChunkContent: {
                        some: {
                            Chunk: {
                                Node: {
                                    some: { treeId: trees[i].id },
                                },
                            },
                        },
                    },
                },
            });
            list.push({ ...trees[i], chunkTotal, pointTotal });
        }
        return list;
    }

    remove(id: number) {
        return this.prisma.tree.update({
            where: { id },
            data: { isDel: true },
        });
    }

    togglePublic(id: number, value: boolean) {
        return this.prisma.tree.update({
            where: { id },
            data: { isPublic: value },
        });
    }

    update(id: number, dto: UpdateTreeDTO) {
        return this.prisma.tree.update({
            where: { id },
            data: { ...dto },
        });
    }

    create(dto: CreateTreeDTO, userId: string) {
        return this.prisma.tree.create({
            data: {
                ...dto,
                authorId: userId,
            },
        });
    }
}
