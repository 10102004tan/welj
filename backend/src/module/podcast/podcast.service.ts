import { BadRequestException, Injectable, Logger, NotFoundException,Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Podcast } from './schema/podcast.shema';
import { ResultRepo } from '../result/schema/repo/result.repo';

@Injectable()
export class PodcastService {
    constructor(
        @InjectModel('Podcast') private readonly podcastModel: Model<Podcast>,
        @Inject(forwardRef(() => ResultRepo))
        private readonly resultRepo: ResultRepo
    ) { }

    create = async (payload: any) => {
        const { title, description, thumbnail, audio_url, scripts, is_published, is_draft, published_at, authorId, idx_hidden } = payload;

        const newPodcast = new this.podcastModel({
            title,
            description,
            thumbnail,
            audio_url,
            scripts,
            is_published,
            is_draft,
            published_at,
            authorId,
        })


        const podcast = await newPodcast.save()

        if (!podcast) {
            throw new BadRequestException('create podcast wrong!!!!')
        }

        return podcast;
    }

    findAll = async (payload: any) => {
        const { page = 1, limit = 15, authorId } = payload;
        const skip = (page - 1) * limit;
        const podcasts = await this.podcastModel.find({ authorId }).populate('authorId', 'fullname email').select("-__v -is_published -scripts -is_deleted -is_draft -created_at -updated_at").skip(skip).limit(limit).sort({ created_at: -1 }).lean();
        const total = await this.podcastModel.countDocuments({ authorId });
        const totalPage = Math.ceil(total / limit);
        const hasNextPage = page < totalPage;
        const hasPrevPage = page > 1;
        return {
            podcasts,
            total,
            totalPage,
            hasNextPage,
            hasPrevPage,
        }
    }

    update = async (payload: any) => {
        const { id, title, description, thumbnail, audio_url, scripts, is_published, is_draft, published_at, idx_hidden } = payload;
        const podcast = await this.podcastModel.findByIdAndUpdate(id, {
            title,
            description,
            thumbnail,
            audio_url,
            scripts,
            is_published,
            is_draft,
            published_at,
            idx_hidden,
            updated_at: Date.now(),
        }, { new: true });

        if (!podcast) {
            throw new BadRequestException('update podcast wrong!!!!')
        }

        return podcast;
    }

    findOne = async (payload: any) => {
        const { id,userId} = payload;
        const podcast = await this.podcastModel.findById(id).populate('authorId', 'fullname email');
        if (!podcast) {
            throw new BadRequestException('find podcast wrong!!!!')
        }
       
        // check is_completed in result
        const isCompletedResult = await this.resultRepo.findResultOne({ podcastId: podcast._id as string,userId:userId, select: ['is_completed _id list_answers'] });
        return {
            ...podcast.toObject(),
            is_completed: isCompletedResult?.is_completed || false,
            resultId: isCompletedResult?._id || null,
            list_answers: isCompletedResult?.list_answers || [],
        };
    }

    /**
     [
    {
        "timestamp":"00:00",
        "texts":["みなさん","こんにちは"]
    },
    {
        "timestamp":"00:00",
        "texts":["みなさん","こんにちは"]
    }
    ]
     */
    review = async (payload: any) => {
        const { list, podcastId } = payload;
        const podcast = await this.podcastModel.findById(podcastId);

        if (!podcast) {
            throw new NotFoundException('find podcast wrong!!!!')
        }

        const { scripts } = podcast;
        let percentReview = 0;
        let total = podcast.scripts.filter((script: any) => script.idx_hidden && script.idx_hidden.length > 0).flatMap((script: any) => script.idx_hidden).length;
        let totalCorrect = 0;
        /*
        {
            "timestamp": "00:00",
            "speaker": "Naoko",
            "text": "みなさん、こんにちは！なおこです。",
            "idx_hidden": [
                [
                    0,
                    3
                ],
                [
                    5,
                    9
                ]
            ]
        }
        */


        /**
                 script = {
                    timestamp: "00:00",
                    text: "みなさん、こんにちは！なおこです。",
                    idx_hidden: [
                        [
                            0,
                            3
                        ],
                        [
                            5,
                            9
                        ]
                    ]
                 }

                 item = {
                    texts: ["みなさん", "こんにちは"],
                    timestamp: "00:00"
                 }
                 */

        list.forEach((item: any) => {
            const { texts, timestamp } = item;
            const script = scripts.find((script: any) => script.timestamp === timestamp);
            if (!script) {
                return;
            }
            const { text, idx_hidden=[] } = script;
           
            idx_hidden.forEach((idx_hidden_item:any,index: number) => {
                let isCorrect = text.slice(idx_hidden_item[0], idx_hidden_item[1]) === texts[index];
                if (isCorrect) {
                    totalCorrect++;
                }
            })
        })

        percentReview = (totalCorrect / total) * 100;

        return {
            percentReview,
            totalCorrect,
            total,
            totalReview: list.length,
        }
    }
}