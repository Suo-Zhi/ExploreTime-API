import { IsIn, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SortInfo {
    @IsIn(['createTime', 'updateTime'])
    field: string;
    @IsIn(['asc', 'desc'])
    order: string;
}

export class FindInfoDTO {
    keywords: string;

    @ValidateNested()
    @Type(() => SortInfo)
    sort: SortInfo;
}
