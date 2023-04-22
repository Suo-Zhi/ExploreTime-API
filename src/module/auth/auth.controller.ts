import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Auth } from 'module/auth/jwt/auth.decorator';
import { CurrentUser } from './jwt/user.decorator';
import { Learner } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDTO) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDTO) {
        return this.authService.login(dto);
    }

    @Auth()
    @Get('current-user-info')
    getCurrentUserInfo(@CurrentUser() user: Learner) {
        return this.authService.getCurrentUserInfo(user.id);
    }
}
