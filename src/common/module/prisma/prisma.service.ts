import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        // 开发环境下打印查询日志
        super(process.env.NODE_ENV === 'development' ? { log: ['query'] } : {});
    }
}
