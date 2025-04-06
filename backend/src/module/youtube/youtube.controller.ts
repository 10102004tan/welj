import { Controller, Param, Post } from "@nestjs/common";
import { YoutubeService } from "./youtube.service";

@Controller('youtube')
export class YoutubeController {
    constructor(private readonly youtubeService: YoutubeService,) {
        
    }

    // Define your controller methods here
    @Post('download-video/:videoId')
    async downloadVideo(@Param('videoId') videoId: string) {
     return await this.youtubeService.downloadYouTubeVideo(videoId)
    } 
}