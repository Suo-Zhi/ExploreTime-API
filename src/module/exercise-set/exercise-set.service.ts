import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseSetService {
    constructor(private readonly prisma: PrismaService) {}
}
