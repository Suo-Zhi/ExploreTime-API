import { IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SortExerciseSet {
    @IsIn(['createTime', 'updateTime'])
    field: string;
    @IsIn(['asc', 'desc'])
    order: string;
}

export class FindExerciseSetDTO {
    keywords: string;

    @ValidateNested()
    @Type(() => SortExerciseSet)
    sort: SortExerciseSet;
}
