import { PrismaService } from '@/common/module/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindRelateDTO } from './dto/find-relate.dto';
import { DelRelateDTO } from './dto/del-relate.dto';
import { plainToClass } from 'class-transformer';
import { CreateRelateDTO } from './dto/create-relate.dto';

@Injectable()
export class RelateService {
    constructor(private readonly prisma: PrismaService) {}

    // 获取关联知识点详情
    async findPoint(dto: FindRelateDTO) {
        const relations = await this.findType(dto);
        return await this.prisma.point.findMany({
            where: {
                id: { in: relations },
                OR: [{ name: { contains: dto.keywords } }, { content: { contains: dto.keywords } }],
            },
        });
    }

    // 获取关联知识点详情
    async findChunk(dto: FindRelateDTO) {
        const relations = await this.findType(dto);
        const res = await this.prisma.chunk.findMany({
            where: {
                id: { in: relations },
                OR: [
                    { name: { contains: dto.keywords } },
                    { preface: { contains: dto.keywords } },
                    { endnote: { contains: dto.keywords } },
                    {
                        ChunkContent: {
                            some: {
                                Point: {
                                    OR: [{ name: { contains: dto.keywords } }, { content: { contains: dto.keywords } }],
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                ChunkContent: {
                    select: { order: true, Point: true },
                    orderBy: { order: 'asc' },
                },
            },
        });

        // 修改响应数据格式
        return res.map(({ ChunkContent, ...chunk }) => {
            const regExp = new RegExp(dto.keywords);

            return {
                ...chunk,
                content: ChunkContent.map((chunkContent) => {
                    return {
                        ...chunkContent.Point,
                        order: chunkContent.order,
                        isMatch:
                            dto.keywords === ''
                                ? false
                                : regExp.test(chunkContent.Point.name) || regExp.test(chunkContent.Point.content),
                    };
                }),
            };
        });
    }

    // 获取关联知识树
    async findTree(dto: FindRelateDTO) {
        const relations = await this.findType(dto);
        return await this.prisma.tree.findMany({
            where: {
                id: { in: relations },
                OR: [{ name: { contains: dto.keywords } }, { preface: { contains: dto.keywords } }],
            },
        });
    }

    // 获取关联讲解
    async findExplain(dto: FindRelateDTO) {
        const relations = await this.findType(dto);
        return await this.prisma.explain.findMany({
            where: {
                id: { in: relations },
                OR: [{ title: { contains: dto.keywords } }, { content: { contains: dto.keywords } }],
            },
        });
    }

    // 获取关联习题
    async findExercise(dto: FindRelateDTO) {
        const relations = await this.findType(dto);
        return await this.prisma.exercise.findMany({
            where: {
                id: { in: relations },
                OR: [
                    { question: { contains: dto.keywords } },
                    { detail: { contains: dto.keywords } },
                    { answer: { contains: dto.keywords } },
                    { analysis: { contains: dto.keywords } },
                ],
            },
        });
    }

    // 获取关联习题集
    async findExerciseSet(dto: FindRelateDTO) {
        const relations = await this.findType(dto);
        return await this.prisma.exerciseSet.findMany({
            where: {
                id: { in: relations },
                OR: [{ name: { contains: dto.keywords } }, { preface: { contains: dto.keywords } }],
            },
        });
    }

    // 查询指定类型的关联项
    async findType(dto: FindRelateDTO) {
        const res1 = await this.prisma.relate
            .findMany({
                where: {
                    targetId: +dto.targetId,
                    targetType: dto.targetType,
                    relateType: dto.relateType,
                },
            })
            .then((res) => {
                return res.map((relation) => {
                    return relation.relateId;
                });
            });

        const res2 = await this.prisma.relate
            .findMany({
                where: {
                    relateId: +dto.targetId,
                    relateType: dto.targetType,
                    targetType: dto.relateType,
                },
            })
            .then((res) => {
                return res.map((relation) => {
                    return relation.targetId;
                });
            });

        return [...res1, ...res2];
    }

    delete(dto: DelRelateDTO) {
        return this.prisma.relate.deleteMany({
            where: {
                OR: [
                    {
                        targetId: +dto.targetId,
                        targetType: dto.targetType,
                        relateId: +dto.relateId,
                        relateType: dto.relateType,
                    },
                    {
                        targetId: +dto.relateId,
                        targetType: dto.relateType,
                        relateId: +dto.targetId,
                        relateType: dto.targetType,
                    },
                ],
            },
        });
    }

    async create(dto: CreateRelateDTO) {
        // 不能关联本身
        if (dto.targetId === dto.relateId && dto.targetType === dto.relateType)
            return { status: 0, msg: '不能关联本身' };

        // 不能重复关联
        const res = await this.prisma.relate.findUnique({
            where: { targetId_targetType_relateId_relateType: { ...dto } },
        });
        if (res) return { status: 0, msg: '已存在该关联' };

        return this.prisma.relate.create({
            data: { ...dto },
        });
    }
}
