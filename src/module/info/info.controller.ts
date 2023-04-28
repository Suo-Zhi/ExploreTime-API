import { Controller, Get, Query } from '@nestjs/common';
import { InfoService } from './info.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';
import { FindInfoDTO } from './dto/find-info.dto';

@Auth()
@Controller('info')
export class InfoController {
    constructor(private readonly infoService: InfoService) {}

    @Get('my')
    findMy(@Query() dto: FindInfoDTO, @CurrentUser() user: Learner) {
        return this.infoService.findMy(dto.keywords, dto.sort, user.id);
    }
}
