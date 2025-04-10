import { Body, Controller, Get, Logger, Param, Post, Query, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { PodcastService } from './podcast.service';

@Controller('podcast')
export class PodcastController {

    constructor(
        private readonly podcastService: PodcastService,
    ){}

    @Post('create')
    async createPodcast(@Body() payload:any,@Request() req:any) {
        return this.podcastService.create({...payload, authorId:req.user.userId})
    }

    @Get('list')
    async getListPodcast(@Query() query:any,@Request() req:any) {
        return this.podcastService.findAll({...query})
    }

    @Post('update')
    async updatePodcast(@Body() payload:any,@Request() req:any) {
        return this.podcastService.update({...payload, authorId:req.user.userId})
    }

    @Post('review')
    async reviewPodcast(@Body() payload:any,@Request() req:any) {
        return this.podcastService.review({...payload})
    }

    @Get('detail/:id')
    async getDetailPodcast(@Request() req:any,@Param('id') id:string) {
        const payload = {id,userId:req?.user.userId}
        return this.podcastService.findOne(payload)
    }

    @Get('listen/:id')
    async getListenPodcast(@Request() req:any,@Param('id') id:string) {
        const payload = {id,userId:req?.user.userId}
        return this.podcastService.findOne(payload)
    }

    @Get('recent')
    async getRecentPodcast(@Query() query:any,@Request() req:any) {
        return await this.podcastService.recent({...query, userId:req.user.userId})
    }

}
