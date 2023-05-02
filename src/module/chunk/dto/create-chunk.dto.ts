import { IsNotEmpty } from 'class-validator';

export class CreateChunkDTO {
    @IsNotEmpty({ message: '知识块名不能为空' })
    name: string;

    preface: string;

    endnote: string;
}
