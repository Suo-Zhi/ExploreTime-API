import { IsIn, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { OutputType, outputType } from '@/module/relate/dto/relate.type';

export class CreateFeedbackDTO {
    @IsNotEmpty()
    @Type(() => Number)
    targetId: number;

    @IsIn(outputType)
    targetType: OutputType;

    @IsNotEmpty()
    content: string;
}
