import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpsertExerciseSetContentDTO } from './dto/upsert-exerciseSetContent.dto';
import { DeleteExerciseSetContentDTO } from './dto/delete-exerciseSetContent.dto';

@Injectable()
export class ExerciseSetContentService {
    constructor(private readonly prisma: PrismaService) {}

    upsert(dto: UpsertExerciseSetContentDTO) {
        return this.prisma.exerciseSetContent.upsert({
            where: {
                setId_order: {
                    setId: +dto.setId,
                    order: +dto.order,
                },
            },
            update: {
                exerciseId: dto.exerciseId,
            },
            create: {
                setId: dto.setId,
                order: dto.order,
                exerciseId: dto.exerciseId,
            },
        });
    }

    delete(dto: DeleteExerciseSetContentDTO) {
        return this.prisma.exerciseSetContent.delete({
            where: {
                setId_order: {
                    setId: +dto.setId,
                    order: +dto.order,
                },
            },
        });
    }
}
