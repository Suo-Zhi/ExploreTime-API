import { IsNotEmpty } from 'class-validator';

export class CreateExerciseDTO {
    @IsNotEmpty({ message: '习题题目不能为空' })
    question: string;

    detail: string;
    answer: string;
    analysis: string;
}
