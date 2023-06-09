import { IsIn, IsNotEmpty } from 'class-validator';
import { OutputType, outputType } from './relate.type';

export class FindRelateDTO {
    @IsNotEmpty()
    targetId: number;

    @IsIn(outputType)
    targetType: OutputType;

    @IsIn(outputType)
    relateType: OutputType;

    keywords: string;
}
