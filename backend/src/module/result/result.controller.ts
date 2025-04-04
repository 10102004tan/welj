import { Body, Controller, Get, Logger, Param, Post, Query, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {

    constructor(
        private readonly resultService: ResultService,
    ){}

    @Post('save')
    createPodcast(@Body() payload:any,@Request() req:any) {
        return this.resultService.create({...payload, userId:req.user.userId})
    }

    @Get('get/:podcastId')
    findOne(@Param('podcastId') podcastId:string,@Request() req:any) {
        return this.resultService.findOne({podcastId, userId:req.user.userId})
    }
}
