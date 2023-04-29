import { Controller, Get, Query } from '@nestjs/common';
import { PointService } from './point.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { FindPointDTO } from './dto/find-point.dto';
import { Learner } from '@prisma/client';

@Controller('point')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Auth()
    @Get('my')
    findMy(@Query() dto: FindPointDTO, @CurrentUser() user: Learner) {
        return this.pointService.findMy(dto.keywords, dto.sort, user.id);
    }
}
