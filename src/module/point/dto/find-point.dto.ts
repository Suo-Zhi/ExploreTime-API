import { IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SortPoint {
    @IsIn(['createTime', 'updateTime'])
    field: string;
    @IsIn(['asc', 'desc'])
    order: string;
}

export class FindPointDTO {
    keywords: string;

    @ValidateNested()
    @Type(() => SortPoint)
    sort: SortPoint;
}
