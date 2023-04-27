import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const fileFilter = (types: string[]) => {
    return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        const isBelong = types.some((type) => file.mimetype.includes(type));
        if (!isBelong) {
            callback(new UnsupportedMediaTypeException('上传的文件类型不在允许范围内'), false);
        } else {
            callback(null, true);
        }
    };
};

export const Upload = (options: MulterOptions, field: string = 'file') => {
    return applyDecorators(UseInterceptors(FileInterceptor(field, options)));
};

export const UploadImage = (mb: number = 2, field: string = 'file') => {
    return Upload({
        limits: { fieldSize: 1024 * 1024 * mb },
        fileFilter: fileFilter(['image']),
    });
};
