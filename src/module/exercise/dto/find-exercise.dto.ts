import { IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SortExercise {
    @IsIn(['createTime', 'updateTime'])
    field: string;
    @IsIn(['asc', 'desc'])
    order: string;
}

export class FindExerciseDTO {
    keywords: string;

    @ValidateNested()
    @Type(() => SortExercise)
    sort: SortExercise;
}
