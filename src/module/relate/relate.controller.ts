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

    @Get('tree')
    findTree(@Query() dto: FindRelateDTO) {
        return this.relateService.findTree(dto);
    }

    @Get('explain')
    findExplain(@Query() dto: FindRelateDTO) {
        return this.relateService.findExplain(dto);
    }

    @Get('exercise')
    findExercise(@Query() dto: FindRelateDTO) {
        return this.relateService.findExercise(dto);
    }

    @Get('exercise-set')
    findExerciseSet(@Query() dto: FindRelateDTO) {
        return this.relateService.findExerciseSet(dto);
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
