import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Resource {
    @Prop({ required: true })
    name: string;
    @Prop({ default: '', unique: true })
    slug: string;
    @Prop({ default: '' })
    description: string;
    @Prop({ default: Date.now })
    created_at: Date;
    @Prop({ default: Date.now })
    updated_at: Date;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);