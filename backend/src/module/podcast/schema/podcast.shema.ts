import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import slugify from 'slugify';
import { Language } from 'src/common/enums/language.enum';

class PodcastScript {
    text: string; // noi dung phat song
    time: number; // thoi gian phat song
    idx_hidden: number[][]; // default la [] neu khong co idx_hidden
}


@Schema()
export class Podcast extends Document {

    @Prop({ required: true })
    title:string;

    @Prop({ default: '' })
    slug:string; // duong dan toi podcast

    @Prop({ default: '' })
    thumbnail:string; // hinh anh thumbnail

    @Prop({ default: '' })
    description :string;

    @Prop({required: true,ref:'User'})
    authorId:string;

    @Prop({ default: '' })
    source :string; // nguon cua podcast

    @Prop({ required: true })
    audio_url:string; // link audio

    @Prop({default:0})
    listen_count:number; // so luong nghe

    @Prop({default:Language.JA,enum:Language})
    language: string; // ngon ngu phat song

    @Prop({required: true})
    scripts: PodcastScript[]; // noi dung phat song

    @Prop({default:Date.now})
    published_at: Date; // thoi gian phat song

    @Prop({ default: Date.now })
    created_at: Date; // thoi gian tao podcast

    @Prop({ default: Date.now })
    updated_at: Date; // thoi gian cap nhat podcast

    @Prop({ default: false })
    is_deleted: boolean; // xoa hay khong

    @Prop({ default: false })
    is_published: boolean; // da phat song hay chua

    @Prop({ default: true })
    is_draft: boolean; // da tao nhung chua phat song
}



export const PodcastSchema = SchemaFactory.createForClass(Podcast);

// hook create slug pre save
PodcastSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
})