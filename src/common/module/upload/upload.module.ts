import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadController } from './upload.controller';

@Global()
@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory() {
                return {
                    storage: diskStorage({
                        // 设置文件储存位置
                        destination: 'uploads',
                        // 设置文件名: 时间戳+随机数+文件扩展名
                        filename: (req, file, callback) => {
                            const path =
                                Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname);
                            callback(null, path);
                        },
                    }),
                };
            },
        }),
    ],
    controllers: [UploadController],
})
export class UploadModule {}
