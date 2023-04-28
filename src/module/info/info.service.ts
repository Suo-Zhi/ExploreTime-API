import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/module/prisma/prisma.service';

@Injectable()
export class InfoService {
    constructor(private readonly prisma: PrismaService) {}
}
