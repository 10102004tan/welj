import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(userData:any):Promise<User> {
        const { email, password, fullname } = userData;
        const newUser = new this.userModel({ email, password, fullname });
        return newUser.save();
    }

    async findAll(){

    }

    async findOne(id:string){
        // find user by id
        Logger.log("userId", id)
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id:string, userData:any){

    }

    async remove(id:string){

    }

    async findByEmail(email:string){
        // found user by email
        const user = await this.userModel.findOne({ email });
        return user;
    }
}