import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SortExercise } from './dto/find-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { CreateExerciseDTO } from './dto/create-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(private readonly prisma: PrismaService) {}

    findMy(keywords: string, sort: SortExercise, userId: string) {
        return this.prisma.exercise.findMany({
            where: {
                authorId: userId,
                OR: [
                    { question: { contains: keywords } },
                    { detail: { contains: keywords } },
                    { answer: { contains: keywords } },
                    { analysis: { contains: keywords } },
                ],
                isDel: false,
            },
            orderBy: { [sort.field]: sort.order },
        });
    }

    remove(id: number) {
        return this.prisma.exercise.update({
            where: { id },
            data: { isDel: true },
        });
    }

    toggleRefine(id: number, value: boolean) {
        return this.prisma.exercise.update({
            where: { id },
            data: { isRefine: value },
        });
    }

    update(id: number, dto: UpdateExerciseDTO) {
        return this.prisma.exercise.update({
            where: { id },
            data: { ...dto },
        });
    }

    create(dto: CreateExerciseDTO, userId: string) {
        return this.prisma.exercise.create({
            data: {
                ...dto,
                authorId: userId,
            },
        });
    }
}
