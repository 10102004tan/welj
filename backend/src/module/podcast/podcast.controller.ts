import { Body, Controller, Get, Logger, Param, Post, Query, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { PodcastService } from './podcast.service';

@Controller('podcast')
export class PodcastController {

    constructor(
        private readonly podcastService: PodcastService,
    ){}

    @Post('create')
    createPodcast(@Body() payload:any,@Request() req:any) {
        return this.podcastService.create({...payload, authorId:req.user.userId})
    }

    @Get('list')
    getListPodcast(@Query() query:any,@Request() req:any) {
        return this.podcastService.findAll({...query, authorId:req.user.userId})
    }

    @Post('update')
    updatePodcast(@Body() payload:any,@Request() req:any) {
        return this.podcastService.update({...payload, authorId:req.user.userId})
    }

    @Post('review')
    reviewPodcast(@Body() payload:any,@Request() req:any) {
        return this.podcastService.review({...payload})
    }

    @Get('detail/:id')
    getDetailPodcast(@Query() query:any,@Request() req:any,@Param('id') id:string) {
        return this.podcastService.findOne({...query, userId:req.user.userId, id})
    }


}
