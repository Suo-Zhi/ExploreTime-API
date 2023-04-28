import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Auth } from '@/module/auth/jwt/auth.decorator';
import { UploadImage } from './upload.decorator';

@Controller('upload')
export class UploadController {
    @Auth()
    @Post('img')
    @UploadImage()
    image(@UploadedFile() file: Express.Multer.File) {
        return {
            url: process.env.URL + 'static/' + file.filename,
        };
    }
}
