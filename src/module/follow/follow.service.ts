import { PrismaService } from '@/common/module/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateFollowDTO } from './dto/create-follow.dto';

@Injectable()
export class FollowService {
    constructor(private readonly prisma: PrismaService) {}

    create(dto: CreateFollowDTO) {
        return this.prisma.follow.create({
            data: { ...dto },
        });
    }
}
