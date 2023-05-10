import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseService {
    constructor(private readonly prisma: PrismaService) {}
}
