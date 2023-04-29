import { IsNotEmpty } from 'class-validator';

export class CreatePointDTO {
    @IsNotEmpty({ message: '知识点名不能为空' })
    name: string;

    content: string;
}
