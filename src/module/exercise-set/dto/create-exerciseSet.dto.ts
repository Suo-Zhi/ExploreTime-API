import { IsNotEmpty } from 'class-validator';

export class CreateExerciseSetDTO {
    @IsNotEmpty({ message: '习题集名不能为空' })
    name: string;

    preface: string;
}
