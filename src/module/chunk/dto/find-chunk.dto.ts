import { IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SortChunk {
    @IsIn(['createTime', 'updateTime'])
    field: string;
    @IsIn(['asc', 'desc'])
    order: string;
}

export class FindChunkDTO {
    keywords: string;

    @ValidateNested()
    @Type(() => SortChunk)
    sort: SortChunk;
}
