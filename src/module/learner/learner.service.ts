import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnerService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(id: string, userId: string) {
        const { password, FollowTargets, ...userInfo } = await this.prisma.learner.findUnique({
            where: { id },
            include: {
                FollowTargets: {
                    where: { followerId: userId },
                    select: { id: true },
                },
            },
        });

        return {
            ...userInfo,
            isFollow: {
                value: FollowTargets.length === 0 ? false : true,
                id: FollowTargets[0]?.id || null,
            },
        };
    }
}
