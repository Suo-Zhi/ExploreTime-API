import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateFollowDTO } from './dto/create-follow.dto';
import { DeleteFollowDTO } from './dto/delete-follow.dto';
import { FindFollowDTO } from './dto/find-follow.dto';

@Injectable()
export class FollowService {
    constructor(private readonly prisma: PrismaService) {}

    create(dto: CreateFollowDTO) {
        return this.prisma.follow.create({
            data: { ...dto },
        });
    }

    async isFollow(dto: FindFollowDTO) {
        return this.prisma.follow
            .findUnique({
                where: {
                    targetId_followerId: { ...dto },
                },
            })
            .then((res) => {
                if (res === null) return false;
                else return true;
            });
    }

    delete(dto: DeleteFollowDTO) {
        return this.prisma.follow.delete({
            where: {
                targetId_followerId: { ...dto },
            },
        });
    }
}
