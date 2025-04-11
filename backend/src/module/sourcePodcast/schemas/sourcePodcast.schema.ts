import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import slugify from "slugify";

@Schema()
export class SourcePodcast extends Document{
    @Prop({ required: true })
    name: string;
    @Prop({default: ''})
    description: string;
    @Prop({ default: '' })
    slug: string;
    @Prop({default: ''})
    url: string;
    @Prop({default: ''})
    thumbnail: string;
    @Prop({default:Date.now})
    createdAt: Date;
    @Prop({default:Date.now})
    updatedAt: Date;
}

export const SourcePodcastSchema = SchemaFactory.createForClass(SourcePodcast);

//hook to generate slug from name before saving the document
SourcePodcastSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
})

