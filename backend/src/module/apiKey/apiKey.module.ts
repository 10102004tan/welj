import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKey, ApiKeySchema } from './schemas/apiKey.schema';
import { ApiKeyService } from './apiKey.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }])],
  exports:[ApiKeyService],
  providers: [ApiKeyService],
})
export class ApiKeyModule {}