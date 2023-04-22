import { PrismaService } from '@/common/module/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

    async register(dto: RegisterDTO) {
        return await this.prisma.learner.create({
            data: {
                id: dto.id,
                username: dto.username,
                password: await hash(dto.password),
            },
        });
    }

    async login(dto: LoginDTO) {
        const user = await this.prisma.learner.findUnique({
            where: {
                id: dto.id,
            },
        });

        if (await verify(user.password, dto.password)) return { token: await this.jwt.signAsync({ ...user }) };
        throw new BadRequestException('密码错误');
    }
}
