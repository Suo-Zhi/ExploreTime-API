import { IsNotEmpty } from 'class-validator';

export class CreateLikeDTO {
    @IsNotEmpty()
    targetType: 'feedback' | 'reply';

    @IsNotEmpty()
    targetId: number;
}
