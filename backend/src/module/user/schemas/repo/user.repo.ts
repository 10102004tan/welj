import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepo {
   constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
    async findUserByEmail({
        email,
        select=["email", "fullname", "password"],
    }:{
        email: string,
        select: string[]
    }){
        // find user by email and get role
        const userFound = await this.userModel.findOne({ email }).populate("user_role").select("fullname email password -user_role").lean();
        if (!userFound) return null;
        return userFound;
    }
}