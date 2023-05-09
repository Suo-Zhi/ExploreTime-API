import { IsNotEmpty } from 'class-validator';

export class CreateReplyDTO {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    feedbackId: number;

    rootId: number;
    receiverId: string;
}
