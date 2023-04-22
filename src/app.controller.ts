import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './common/module/prisma/prisma.service';
import { Auth } from 'module/auth/jwt/auth.decorator';

@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {}

    @Auth()
    @Get()
    async getHello() {
        return await this.prisma.learner.findMany();
    }
}
