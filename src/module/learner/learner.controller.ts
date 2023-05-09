import { Controller, Get, Param, Query } from '@nestjs/common';
import { LearnerService } from './learner.service';

@Controller('learner')
export class LearnerController {
    constructor(private readonly learnerService: LearnerService) {}

    @Get(':id')
    findOne(@Param('id') id: string, @Query('userId') userId: string) {
        return this.learnerService.findOne(id, userId);
    }
}
