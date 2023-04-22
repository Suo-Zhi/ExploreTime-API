import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import config from '@/config';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets('uploads', { prefix: '/static' }); // 静态资源访问目录
    app.useGlobalInterceptors(new TransformInterceptor()); // 响应数据包裹
    app.setGlobalPrefix('api'); // 请求前置路径
    await app.listen(config().port);
}
bootstrap();
