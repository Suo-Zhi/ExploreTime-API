import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnerService {
    constructor(private readonly prisma: PrismaService) {}
}
