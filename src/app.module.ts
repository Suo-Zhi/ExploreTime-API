import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/module/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { UploadModule } from './common/module/upload/upload.module';
import { InfoModule } from './module/info/info.module';
import { PointModule } from './module/point/point.module';
import config from '@/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        PrismaModule,
        AuthModule,
        UploadModule,
        InfoModule,
        PointModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
