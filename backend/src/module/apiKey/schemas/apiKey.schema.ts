import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ApiKey extends Document {
    @Prop({ required: true })
    privateKey:string;

    @Prop({ required: true })
    publicKey:string;

    @Prop({ required: true,ref: 'User' })
    userId:string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);