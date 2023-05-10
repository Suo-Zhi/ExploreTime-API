import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/module/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { UploadModule } from './common/module/upload/upload.module';
import { InfoModule } from './module/info/info.module';
import { PointModule } from './module/point/point.module';
import { RelateModule } from './module/relate/relate.module';
import { ChunkModule } from './module/chunk/chunk.module';
import { TreeModule } from './module/tree/tree.module';
import { FeedbackModule } from './module/feedback/feedback.module';
import { LearnerModule } from './module/learner/learner.module';
import { ReplyModule } from './module/reply/reply.module';
import { LikeModule } from './module/like/like.module';
import { FollowModule } from './module/follow/follow.module';
import { ExplainModule } from './module/explain/explain.module';
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
        RelateModule,
        ChunkModule,
        TreeModule,
        FeedbackModule,
        LearnerModule,
        ReplyModule,
        LikeModule,
        FollowModule,
        ExplainModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
