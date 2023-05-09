import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { FindFollowDTO } from './dto/find-follow.dto';

@Controller('follow')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Auth()
    @Post()
    create(@Body('targetId') targetId: string, @CurrentUser() user: Learner) {
        return this.followService.create({ targetId, followerId: user.id });
    }

    @Get('is')
    isFollow(@Query() dto: FindFollowDTO) {
        return this.followService.isFollow(dto);
    }

    @Auth()
    @Delete()
    delete(@Query('targetId') targetId: string, @CurrentUser() user: Learner) {
        return this.followService.delete({ targetId, followerId: user.id });
    }
}
