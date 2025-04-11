import { Body, Controller, Get, Logger, Param, Post, Put, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { AccessGuard } from '../rbac/access.guard';
import { Grant } from '../rbac/grants.decorator';
import { Action } from 'src/common/enums/action.enum';
import { QueryPaginationDto } from './dto/query-pagination.dto';

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
    async getListPodcast(@Query() query:QueryPaginationDto,@Request() req:any) {
        return this.podcastService.findAll({...query})
    }

    @Get('listAny')
    @UseGuards(AccessGuard)
    @Grant(Action.READ_ANY, 'podcast')
    async getListAnyPodcast(@Query() query:any,@Request() req:any) {
        return this.podcastService.findAll({...query,select:['title','description','thumbnail','audio_url','is_published','is_draft','published_at','authorId']})
    }

    @Put('update/:podcastId')
    async updatePodcast(@Body() payload:any,@Request() req:any, @Param('podcastId') podcastId:string) {
        return this.podcastService.update({...payload,podcastId, authorId:req.user.userId})
    }

    @Post('review')
    async reviewPodcast(@Body() payload:any,@Request() req:any) {
        return this.podcastService.review({...payload})
    }

    @Get('detail/:id')
    async getDetailPodcast(@Request() req:any,@Param('id') id:string) {
        const payload = {id}
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
