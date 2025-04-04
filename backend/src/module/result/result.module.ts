import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication } from 'src/auth';
import { Result, ResultSchema } from './schema/result.shema';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { PodcastModule } from '../podcast/podcast.module';
import { ResultRepo } from './schema/repo/result.repo';

@Module({
  imports: [MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
  forwardRef(()=>PodcastModule)
],
  providers:[ResultService,ResultRepo],
  controllers:[ResultController],
  exports:[ResultRepo]
})
export class ResultModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authentication)
      .forRoutes(ResultController);
  }
}