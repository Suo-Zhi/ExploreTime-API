import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @IsNotEmpty({ message: '用户ID不能为空' })
    id: string;

    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
}
