import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SourcePodcast, SourcePodcastSchema } from "./schemas/sourcePodcast.schema";
import { SourcePodcastService } from "./sourcePodcast.service";
import { SourcePodcastController } from "./sourcePodcast.controller";
import { Authentication } from "src/auth";

@Module({
    imports: [MongooseModule.forFeature([
        { name: SourcePodcast.name, schema: SourcePodcastSchema } // Import the SourcePodcast schema here
    ])],
    controllers: [SourcePodcastController],
    providers: [SourcePodcastService],
    exports: [],
})
export class SourcePodcastModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(Authentication).forRoutes(SourcePodcastController)
      }
}