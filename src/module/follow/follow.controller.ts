import { Body, Controller, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';

@Controller('follow')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Auth()
    @Post()
    create(@Body('targetId') targetId: string, @CurrentUser() user: Learner) {
        return this.followService.create({ targetId, followerId: user.id });
    }
}
