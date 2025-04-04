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
}