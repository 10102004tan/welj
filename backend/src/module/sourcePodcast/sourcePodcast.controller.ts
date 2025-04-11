import { BadRequestException, Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SourcePodcastService } from "./sourcePodcast.service";
import { CreateSourcePodcastDto } from "./dto/create-source-podcast.dto";
import { AccessGuard } from "../rbac/access.guard";
import { Grant } from "../rbac/grants.decorator";
import { Action } from "src/common/enums/action.enum";

@Controller("source-podcast")
export class SourcePodcastController {
    constructor(
        private readonly sourcePodcastService: SourcePodcastService, // Inject your service here
    ) {
    }

    /**
     * Create a new source podcast
     * @param createSourcePodcastDto - The data to create a new source podcast
     */

    @Post("create")
    async createSourcePodcast(@Body() createSourcePodcastDto: CreateSourcePodcastDto) {
        try {
            return this.sourcePodcastService.create(createSourcePodcastDto);
        } catch (error) {
            throw new BadRequestException("Request invalid", error.message);
        }
    }

    /**
     * get all source podcasts
     */
    @Get("all")
    async getAllSourcePodcasts() {
        return this.sourcePodcastService.findAll({});
    }
}