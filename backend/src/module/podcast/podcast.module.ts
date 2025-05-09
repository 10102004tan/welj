import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { PodcastController } from './podcast.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Podcast, PodcastSchema } from './schema/podcast.shema';
import { Authentication } from 'src/auth';
import { ResultModule } from '../result/result.module';
import { RbacModule } from '../rbac/rbac.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Podcast.name, schema: PodcastSchema }]),
  forwardRef(()=>ResultModule),
  RbacModule
],
  providers:[PodcastService],
  controllers:[PodcastController],
  exports:[PodcastService],
})
export class PodcastModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(Authentication).forRoutes("podcast/create","podcast/listAny","podcast/update","podcast/review","podcast/recent","podcast/listen/:id");
  }
}