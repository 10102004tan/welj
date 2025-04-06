import { Module } from '@nestjs/common';
import { MongodbModule } from './database/mongodb.module';
import { AccessModule } from './module/access/access.module';
import { SystemModule } from './module/_system/system.module';
import { PodcastModule } from './module/podcast/podcast.module';
import { ResultModule } from './module/result/result.module';
import { YoutubeModule } from './module/youtube/youtube.module';
import { GeminiModule } from './module/gemini/gemini.module';

@Module({
  imports: [MongodbModule,AccessModule,SystemModule,PodcastModule,ResultModule,YoutubeModule,GeminiModule],
})
export class AppModule {}
