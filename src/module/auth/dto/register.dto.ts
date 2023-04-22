import { IsNotExists } from '@/common/rules/is-not-exists.rule';
import { IsSame } from '@/common/rules/is-same.rule';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty({ message: '账号不能为空' })
    @Length(1, 20, { message: '账号长度要求为1-20' })
    @Matches(/^[\w-]*$/, { message: '账号只能由字母、数字、下划线、减号组成' })
    @IsNotExists('learner', { message: '该账号已被使用' })
    id: string;

    @IsNotEmpty({ message: '昵称不能为空' })
    @Length(1, 15, { message: '昵称长度不能超过15' })
    username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @Length(3, 20, { message: '密码长度应为3~20字符' })
    @IsSame({ message: '两次密码不一致' })
    password: string;

    @IsNotEmpty({ message: '确认密码不能为空' })
    password_confirm: string;
}
