import { IsNotEmpty } from 'class-validator';

export class CreateTreeDTO {
    @IsNotEmpty({ message: '知识树名不能为空' })
    name: string;

    preface: string;
}
