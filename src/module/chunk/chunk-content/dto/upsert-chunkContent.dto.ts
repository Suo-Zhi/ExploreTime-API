import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpsertChunkContentDTO {
    @IsNotEmpty()
    @Type(() => Number)
    chunkId: number;

    @IsNotEmpty()
    @Type(() => Number)
    order: number;

    @IsNotEmpty()
    @Type(() => Number)
    pointId: number;
}
