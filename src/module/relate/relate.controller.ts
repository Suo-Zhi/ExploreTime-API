import { Controller, Delete, Get, Query } from '@nestjs/common';
import { RelateService } from './relate.service';
import { FindRelateDTO } from './dto/find-relate.dto';
import { DelRelateDTO } from './dto/del-relate.dto';

@Controller('relate')
export class RelateController {
    constructor(private readonly relateService: RelateService) {}

    @Get()
    findRelate(@Query() dto: FindRelateDTO) {
        return this.relateService.findRelate(dto);
    }

    @Delete()
    delRelate(@Query() dto: DelRelateDTO) {
        return this.relateService.delRelate(dto);
    }
}
