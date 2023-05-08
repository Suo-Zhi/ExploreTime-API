import { Controller, Get, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FindFeedbackDTO } from './dto/find-feedback.dto';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Get()
    findList(@Query() dto: FindFeedbackDTO) {
        return this.feedbackService.findList(dto);
    }
}
