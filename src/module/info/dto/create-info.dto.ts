import { IsNotEmpty, NotEquals } from 'class-validator';

export class CreateInfoDTO {
    @IsNotEmpty({ message: '有效信息不能为空' })
    @NotEquals('<p><br></p>', { message: '有效信息不能为空' })
    content: string;
}
