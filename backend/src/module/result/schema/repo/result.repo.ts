import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from '../result.shema';

@Injectable()
export class ResultRepo {
    constructor(
        @InjectModel('Result') private readonly resultModel: Model<Result>,
    ) { }

    findResultOne = async ({
        podcastId,
        userId,
        select=[]
    }:{
        podcastId: string,
        userId: string,
        select: string[]
    }) => {
        const result = await this.resultModel.findOne({
            podcastId,
            userId,
        }).select(select?.join(' ')).lean()
        return result
    }

    findResults = async ({
        select=[],
        userId,
        limit=10,
        page=1,
    }:{
        select: string[],
        userId: string,
        limit: number,
        page: number,
    }) => {
        // get result recent
        const skip = (page - 1) * limit;
        const results = await this.resultModel.find({
            userId,
        }).select(select?.join(' ')).sort({ created_at: -1 }).skip(skip).limit(limit).lean()

        return results
    }
}