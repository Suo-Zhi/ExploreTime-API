import { CreateChunkDTO } from './create-chunk.dto';

export class UpdateChunkDTO extends CreateChunkDTO {
    preface: string;
    endnote: string;
}
