import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../config/mongodb.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common/services/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = `mongodb://${configService.get<string>('database.host')}:${configService.get<number>('database.port')}`;
        const dbName = configService.get<string>('database.name');
        Logger.log(`Connecting to MongoDB at ${uri}...`, 'MongodbModule');
        // Lắng nghe sự kiện kết nối thành công
        mongoose.connection.once('open', () => {
          Logger.log('✅ Connected to MongoDB successfully!', 'MongodbModule');
        });

        // Lắng nghe lỗi kết nối
        mongoose.connection.on('error', (err) => {
          Logger.error(`❌ MongoDB connection error: ${err}`, 'MongodbModule');
        });

        return { uri, dbName };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongodbModule {}