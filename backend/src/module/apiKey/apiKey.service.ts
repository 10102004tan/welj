import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from './schemas/apiKey.schema';
import { Model } from 'mongoose';

@Injectable()
export class ApiKeyService {

    /**
     * create api key
     */
    constructor(@InjectModel(ApiKey.name) private readonly apiKeyModel: Model<ApiKey>) {}

    create = async (payload:any) =>{
        const { privateKey, publicKey, userId } = payload;
        const newApiKey = new this.apiKeyModel({ privateKey, publicKey, userId });
        return newApiKey.save();
    }

    update = async () =>{}

    findByUserId = async (userId:any) =>{
        return this.apiKeyModel.findOne({ userId });
    }
}