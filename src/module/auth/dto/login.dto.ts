import { IsExists } from '@/common/rules/is-exists.rule';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @IsNotEmpty({ message: '账号不能为空' })
    @IsExists('learner', { message: '该账号不存在' })
    id: string;

    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
}
