import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLikeDTO } from './dto/create-like.dto';

@Injectable()
export class LikeService {
    constructor(private readonly prisma: PrismaService) {}

    create(dto: CreateLikeDTO, userId: string) {
        let type = 'Feedbacks';
        if (dto.targetType === 'reply') type = 'Replies';

        return this.prisma.like.create({
            data: {
                [type]: {
                    connect: {
                        id: +dto.targetId,
                    },
                },
                User: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
}
