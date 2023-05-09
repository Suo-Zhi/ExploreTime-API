import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { Auth } from '../auth/jwt/auth.decorator';
import { CreateLikeDTO } from './dto/create-like.dto';
import { CurrentUser } from '../auth/jwt/user.decorator';
import { Learner } from '@prisma/client';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Auth()
    @Post()
    createFeedback(@Body() dto: CreateLikeDTO, @CurrentUser() user: Learner) {
        return this.likeService.create(dto, user.id);
    }

    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.likeService.remove(+id);
    }
}
