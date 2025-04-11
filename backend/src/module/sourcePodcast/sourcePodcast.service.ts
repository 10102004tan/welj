import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SourcePodcast } from "./schemas/sourcePodcast.schema";
import { Model } from "mongoose";
import { CreateSourcePodcastDto } from "./dto/create-source-podcast.dto";

@Injectable()
export class SourcePodcastService {
    constructor(
        @InjectModel(SourcePodcast.name) private readonly sourcePodcastModel: Model<SourcePodcast>
    ) {
    }

    /**
     * create a new source podcast
     */
    async create(sourcePodcast: CreateSourcePodcastDto) {
        console.log("sourcePodcast", sourcePodcast);
        const newSourcePodcast = new this.sourcePodcastModel(sourcePodcast);
        return newSourcePodcast.save();
    }

    /**
     * find all source podcasts
     * @param limit number of source podcasts to return
     * @param page page number to return
     * @param sort sort by field
     * @param sortBy sort direction (asc or desc)
     * @param keyword keyword to search for
     * @return array of source podcasts
     */
    async findAll(payload:any): Promise<SourcePodcast[]> {
        const {limit=10, page=1, keyword=''} = payload;
        const query = this.sourcePodcastModel.find({}).limit(limit).skip((page - 1) * limit);
        if (keyword) {
            query.where({ name: { $regex: keyword, $options: "i" } });
        }
        return query.exec();
    }
}