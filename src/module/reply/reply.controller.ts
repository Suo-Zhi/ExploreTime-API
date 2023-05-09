import { Controller, Get, Param } from '@nestjs/common';
import { ReplyService } from './reply.service';

@Controller('reply')
export class ReplyController {
    constructor(private readonly replyService: ReplyService) {}

    @Get('root:feedbackId')
    getRoot(@Param('feedbackId') feedbackId: number) {
        return this.replyService.getRoot(+feedbackId);
    }
}
