import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateExerciseSetDTO } from './dto/update-exerciseSet.dto';
import { CreateExerciseSetDTO } from './dto/create-exerciseSet.dto';
import { SortExerciseSet } from './dto/find-exerciseSet.dto';

@Injectable()
export class ExerciseSetService {
    constructor(private readonly prisma: PrismaService) {}

    findMy(keywords: string, sort: SortExerciseSet, userId: string) {
        return this.prisma.exerciseSet.findMany({
            where: {
                OR: [
                    { name: { contains: keywords } },
                    { preface: { contains: keywords } },
                    {
                        ExerciseSetContent: {
                            some: {
                                Exercise: {
                                    OR: [
                                        { question: { contains: keywords } },
                                        { detail: { contains: keywords } },
                                        { answer: { contains: keywords } },
                                        { analysis: { contains: keywords } },
                                    ],
                                },
                            },
                        },
                    },
                ],
                isDel: false,
                authorId: userId,
            },
            orderBy: {
                [sort.field]: sort.order,
            },
        });
    }

    findPublic(keywords: string) {
        return this.prisma.exerciseSet.findMany({
            where: {
                OR: [
                    { name: { contains: keywords } },
                    { preface: { contains: keywords } },
                    {
                        ExerciseSetContent: {
                            some: {
                                Exercise: {
                                    OR: [
                                        { question: { contains: keywords } },
                                        { detail: { contains: keywords } },
                                        { answer: { contains: keywords } },
                                        { analysis: { contains: keywords } },
                                    ],
                                },
                            },
                        },
                    },
                ],
                isPublic: true,
                isDel: false,
            },
            orderBy: {
                createTime: 'desc',
            },
        });
    }

    async getDetail(id: number) {
        const res = await this.prisma.exerciseSet.findUnique({
            where: { id },
            include: {
                ExerciseSetContent: {
                    select: { order: true, Exercise: true },
                    orderBy: { order: 'asc' },
                },
            },
        });

        // 修改响应数据格式
        const { ExerciseSetContent, ...exerciseSet } = res;
        return {
            ...exerciseSet,
            content: ExerciseSetContent.map((exerciseSetContent) => {
                return {
                    ...exerciseSetContent.Exercise,
                    order: exerciseSetContent.order,
                };
            }),
        };
    }

    remove(id: number) {
        return this.prisma.exerciseSet.update({
            where: { id },
            data: { isDel: true },
        });
    }

    togglePublic(id: number, value: boolean) {
        return this.prisma.exerciseSet.update({
            where: { id },
            data: { isPublic: value },
        });
    }

    update(id: number, dto: UpdateExerciseSetDTO) {
        return this.prisma.exerciseSet.update({
            where: { id },
            data: { ...dto },
        });
    }

    create(dto: CreateExerciseSetDTO, userId: string) {
        return this.prisma.exerciseSet.create({
            data: {
                ...dto,
                authorId: userId,
            },
        });
    }

    updateTime(id: number) {
        return this.prisma.exerciseSet.update({
            where: { id },
            data: { updateTime: new Date() },
        });
    }
}
