import { IsNotEmpty } from 'class-validator';

export class UpsertTreeNodeDTO {
    @IsNotEmpty()
    treeId: number;

    parentNodeId: number | null;

    @IsNotEmpty()
    order: number;

    @IsNotEmpty()
    nodeId: number;
}
