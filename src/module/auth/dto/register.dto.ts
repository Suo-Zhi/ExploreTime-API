import { IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty({ message: '用户账号不能为空' })
    @Length(1, 20, { message: '用户ID长度要求为1-20' })
    @Matches(/^[\w-]*$/, { message: '用户ID只能由字母、数字、下划线、减号组成' })
    id: string;

    @IsNotEmpty({ message: '用户名不能为空' })
    @Length(1, 15, { message: '昵称长度不能超过15' })
    username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @Length(3, 20, { message: '密码长度应为3~20字符' })
    password: string;

    @IsNotEmpty({ message: '确认密码不能为空' })
    password_confirm: string;
}
