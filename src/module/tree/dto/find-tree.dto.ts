import { IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SortTree {
    @IsIn(['createTime', 'updateTime'])
    field: string;
    @IsIn(['asc', 'desc'])
    order: string;
}

export class FindTreeDTO {
    keywords: string;

    @ValidateNested()
    @Type(() => SortTree)
    sort: SortTree;
}
