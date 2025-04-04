import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { UsersModule } from '../users/users.module';
import { ApiKeyModule } from '../apiKey/apiKey.module';

@Module({
  imports: [UsersModule,ApiKeyModule],
  providers:[AccessService],
  controllers:[AccessController],
})
export class AccessModule {}