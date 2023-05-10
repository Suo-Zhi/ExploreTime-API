import { IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SortExplain {
    @IsIn(['createTime', 'updateTime'])
    field: string;
    @IsIn(['asc', 'desc'])
    order: string;
}

export class FindExplainDTO {
    keywords: string;

    @ValidateNested()
    @Type(() => SortExplain)
    sort: SortExplain;
}
