import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplyService {
    constructor(private readonly prisma: PrismaService) {}
}
