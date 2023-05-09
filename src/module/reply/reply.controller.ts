import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CreateReplyDTO } from './dto/create-reply.dto';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';

@Controller('reply')
export class ReplyController {
    constructor(private readonly replyService: ReplyService) {}

    @Get('root:feedbackId')
    getRoot(@Param('feedbackId') feedbackId: number) {
        return this.replyService.getRoot(+feedbackId);
    }

    @Get('child:rootId')
    getChild(@Param('rootId') rootId: number) {
        return this.replyService.getChild(+rootId);
    }

    @Auth()
    @Post()
    create(@Body() dto: CreateReplyDTO, @CurrentUser() user: Learner) {
        return this.replyService.create(dto, user.id);
    }
}
