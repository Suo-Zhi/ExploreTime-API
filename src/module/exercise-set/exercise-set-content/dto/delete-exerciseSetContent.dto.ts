import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DeleteExerciseSetContentDTO {
    @IsNotEmpty()
    @Type(() => Number)
    setId: number;

    @IsNotEmpty()
    @Type(() => Number)
    order: number;
}
