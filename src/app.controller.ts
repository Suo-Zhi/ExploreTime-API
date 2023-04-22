import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './common/module/prisma/prisma.service';
import { Auth } from 'module/auth/jwt/auth.decorator';
import { CurrentUser } from './module/auth/jwt/user.decorator';
import { Learner } from '@prisma/client';

@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {}

    @Auth()
    @Get()
    async getHello(@CurrentUser() user: Learner) {
        return user;
    }
}
