import { IsNotEmpty } from 'class-validator';

export class CreateFollowDTO {
    @IsNotEmpty()
    targetId: string;

    @IsNotEmpty()
    followerId: string;
}
