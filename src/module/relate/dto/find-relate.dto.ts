import { IsIn, IsNotEmpty } from 'class-validator';

export class FindRelateDTO {
    @IsNotEmpty()
    targetId: number;

    @IsIn(['point', 'chunk', 'tree', 'explain', 'exercise', 'exerciseSet'])
    targetType: OutputType;

    @IsIn(['point', 'chunk', 'tree', 'explain', 'exercise', 'exerciseSet'])
    relateType: OutputType;

    keywords: string;
}

type OutputType = 'point' | 'chunk' | 'tree' | 'explain' | 'exercise' | 'exerciseSet';
