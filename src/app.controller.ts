import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './common/module/prisma/prisma.service';

@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {}

    @Get()
    async getHello() {
        return await this.prisma.learner.findMany();
    }
}
