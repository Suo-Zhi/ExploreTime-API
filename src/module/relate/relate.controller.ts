import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { RelateService } from './relate.service';
import { FindRelateDTO } from './dto/find-relate.dto';
import { DelRelateDTO } from './dto/del-relate.dto';
import { CreateRelateDTO } from './dto/create-relate.dto';

@Controller('relate')
export class RelateController {
    constructor(private readonly relateService: RelateService) {}

    @Get('point')
    findPoint(@Query() dto: FindRelateDTO) {
        return this.relateService.findPoint(dto);
    }

    @Get('chunk')
    findChunk(@Query() dto: FindRelateDTO) {
        return this.relateService.findChunk(dto);
    }

    @Delete()
    delete(@Query() dto: DelRelateDTO) {
        return this.relateService.delete(dto);
    }

    @Post()
    createRelate(@Body() dto: CreateRelateDTO) {
        return this.relateService.create(dto);
    }
}
