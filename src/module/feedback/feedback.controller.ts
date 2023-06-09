import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FindFeedbackDTO } from './dto/find-feedback.dto';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { CreateFeedbackDTO } from './dto/create-feeback.dto';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Get()
    findList(@Query() dto: FindFeedbackDTO) {
        return this.feedbackService.findList(dto);
    }

    @Auth()
    @Post()
    create(@Body() dto: CreateFeedbackDTO, @CurrentUser() user: Learner) {
        return this.feedbackService.create(dto, user.id);
    }

    @Patch('remove:id')
    remove(@Param('id') id: number) {
        return this.feedbackService.remove(+id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.feedbackService.delete(+id);
    }
}
