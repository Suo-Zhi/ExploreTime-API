import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/module/prisma/prisma.module';
import config from '@/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        PrismaModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
