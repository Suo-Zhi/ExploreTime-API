import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/common/module/prisma/prisma.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService, private prisma: PrismaService) {
        super({
            //解析用户提交的header中的Bearer Token数据
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //加密码的 secret
            secretOrKey: configService.get('TOKEN_SECRET'),
        });
    }

    // 验证token是否匹配
    async validate(user) {
        // 验证通过后会将用户信息存储在Request对象中
        return this.prisma.learner.findUnique({
            where: { id: user.id },
        });
    }
}
