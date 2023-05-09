import { OutputType, outputType } from '@/module/relate/dto/relate.type';
import { IsIn, IsNotEmpty } from 'class-validator';

export class FindFeedbackDTO {
    @IsNotEmpty()
    targetId: number;

    @IsIn(outputType)
    targetType: OutputType;

    keywords: string;
    userId: string;
}
