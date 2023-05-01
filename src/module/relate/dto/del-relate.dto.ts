import { IsIn, IsNotEmpty } from 'class-validator';
import { OutputType, outputType } from './relate.type';
import { Type } from 'class-transformer';

export class DelRelateDTO {
    @IsNotEmpty()
    @Type(() => Number)
    targetId: number;

    @IsIn(outputType)
    targetType: OutputType;

    @IsNotEmpty()
    @Type(() => Number)
    relateId: number;

    @IsIn(outputType)
    relateType: OutputType;
}
