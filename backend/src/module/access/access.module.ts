import { Module, NestModule } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { UsersModule } from '../user/users.module';
import { ApiKeyModule } from '../apiKey/apiKey.module';
import { Authentication } from 'src/auth';
import { CookieModule } from '../cookie/cookie.module';
import { RbacModule } from '../rbac/rbac.module';

@Module({
  imports: [UsersModule,ApiKeyModule,CookieModule,RbacModule],
  providers:[AccessService],
  controllers:[AccessController],
})
export class AccessModule implements NestModule{
  configure(consumer: any) {
    consumer.apply(Authentication).forRoutes("auth/check-auth");
  }
}