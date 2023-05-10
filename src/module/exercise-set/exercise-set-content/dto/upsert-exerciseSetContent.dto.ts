import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpsertExerciseSetContentDTO {
    @IsNotEmpty()
    @Type(() => Number)
    setId: number;

    @IsNotEmpty()
    @Type(() => Number)
    order: number;

    @IsNotEmpty()
    @Type(() => Number)
    exerciseId: number;
}
