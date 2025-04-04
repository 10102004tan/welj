import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import slugify from 'slugify';


type Answer = {
    timestamp:string,
    texts: string[],
}

@Schema()
export class Result extends Document {
    @Prop({ required: true,ref: 'User' })
    userId: string;

    @Prop({ required: true,ref: 'Podcast' })
    podcastId: string;

    @Prop({ default: 0 })
    progress: number;

    @Prop({default: 0 })
    listen_count: number;

    @Prop({default:[]})
    list_answers:Answer[];

    @Prop({ default: false })
    is_completed: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}
export const ResultSchema = SchemaFactory.createForClass(Result);
