import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,Types } from "mongoose";

type Grant = {
    resource: Types.ObjectId;
    actions: string;
    attributes: string;
}

@Schema()
export class Role extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ default: '', unique: true })
    slug: string;
    @Prop({ default: '' })
    description: string;
    @Prop({ default: '', enum: ['active', 'inactive'] })
    status: string;
    @Prop([
        {
            resource: {
                type: Types.ObjectId,
                ref: 'Resource',
                required: true,
            },
            actions: {
                type: String,
                required: true,
            },
            attributes: {
                type: String,
                default: '*',
            },
        },
    ])
    grants: Grant[];
    @Prop({ default: Date.now })
    created_at: Date;
    @Prop({ default: Date.now })
    updated_at: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);