import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnerService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(id: string) {
        const { password, ...userInfo } = await this.prisma.learner.findUnique({
            where: { id },
        });
        return userInfo;
    }
}
