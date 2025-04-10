import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Authentication } from 'src/auth';
import { UserRepo } from './schemas/repo/user.repo';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports:[UsersService,UserRepo],
  providers: [UsersService,UserRepo],
  controllers: [UsersController],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(Authentication).forRoutes(UsersController);
  }
}