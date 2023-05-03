import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TreeService {
    constructor(private readonly prisma: PrismaService) {}
}
