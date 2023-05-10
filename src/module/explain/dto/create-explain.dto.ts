import { IsNotEmpty } from 'class-validator';

export class CreateExplainDTO {
    @IsNotEmpty({ message: '讲解标题不能为空' })
    title: string;

    content: string;
}
