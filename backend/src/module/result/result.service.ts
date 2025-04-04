import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from './schema/result.shema';
import { PodcastService } from '../podcast/podcast.service';

@Injectable()
export class ResultService {
    constructor(
        @InjectModel('Result') private readonly resultModel: Model<Result>,
        @Inject(forwardRef(() => PodcastService))
        private readonly podcastService: PodcastService,
    ) { }


    create = async (payload: any) => {
        const { userId, podcastId, list=[],is_completed=false } = payload;
        // find result by userId and podcastId
        const resultFound = await this.resultModel.findOne({ userId, podcastId });
        let result;
        if (resultFound) {
            result = await this.resultModel.findByIdAndUpdate(resultFound._id, {
                list_answers: list,
                is_completed,
            }, { new: true });

            if (!result) throw new BadRequestException('error updating result!!!');
            
        }else{
            result = await this.resultModel.create({ userId, podcastId, list_answers: list,is_completed });
            if (!result) throw new BadRequestException('error creating result!!!');
        }
        console.log('result', result)
        // return review
        const review = await this.podcastService.review({
            podcastId,
            userId,
            list: result.list_answers,
        })

        if (!review) throw new BadRequestException('error creating review!!!');

        return {
            ...result.toObject(),
            review,
        }
    }

    update = async (payload: any) => {

    }

    findOne = async (payload: any) => {
        const { userId,podcastId} = payload;
        const resultFound = await this.resultModel.findOne({
            podcastId,
            userId,
        }).populate({
            path: 'podcastId',
            select:"scripts audio_url",
        });
        if (!resultFound || !resultFound.podcastId) throw new NotFoundException('result not found!!!');

        /**
        {
            "timestamp": "2023-10-01T00:00:00.000Z",
            "texts": [
                "text1",
                "text2",
                "text3"
            ],
            correct:[
                "text1",
                "text2",
                "text3"
            ]
        } 
         */
        const { list_answers,is_completed } = resultFound;
        const { scripts,audio_url } = resultFound.podcastId as any;
        if (is_completed){
            const list = scripts.map((item: any) => {
                const { timestamp, idx_hidden=[],text } = item;

                // get text in list_answers by timestamp
                const line = list_answers.find((item: any) => item.timestamp === timestamp);
                const texts = line ? line.texts : Array.from({ length: idx_hidden.length }, () => '');
                return {
                    text,
                    timestamp,
                    texts,
                    idx_hidden
                }
            })

            return {
                list_answers: list,
                audio_url,
                is_completed,
            }
        }
        const list = list_answers.map((item: any) => {
            const { timestamp, texts } = item;
            const line = scripts.find((script: any) => script.timestamp === timestamp);
            if (!line) return null;
            const {text, idx_hidden=[]} = line;
            const correct = line.idx_hidden.map((idx: any) => {
                const text = line.text.slice(idx[0], idx[1]);
                return text;
            })
            return {
                text,
                timestamp,
                texts,
                correct,
            }
        })

        return {
            list_answers: list,
            audio_url,
            is_completed,
        }
    }
}