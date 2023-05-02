import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DeleteChunkContentDTO {
    @IsNotEmpty()
    @Type(() => Number)
    chunkId: number;

    @IsNotEmpty()
    @Type(() => Number)
    order: number;
}
