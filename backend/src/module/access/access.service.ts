import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { ApiKeyService } from '../apiKey/apiKey.service';
import { generateToken } from 'src/auth';
const {v4: uuidv4} = require('uuid')


@Injectable()
export class AccessService {

    constructor(
        private readonly userService: UsersService,
        private readonly apiKeyService:ApiKeyService
    ) {}
    

    async signUp(user: any) {
        const {email, password,fullname} = user;
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        // hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await this.userService.create({email, password:hashedPassword,fullname});
        if (!newUser) {
            throw new BadRequestException('User creation failed');
        }
        
        // generate apiKey here
        const privateKey = await uuidv4();
        const publicKey = await uuidv4();
        const apiKey = await this.apiKeyService.create({privateKey, publicKey, userId: newUser._id});

        if (!apiKey) {
            throw new BadRequestException('ApiKey creation failed');
        }

        return newUser;
    }

    async signIn(user: any) {
        const {email, password} = user;
        const existingUser = await this.userService.findByEmail(email);
        if (!existingUser) {
            throw new BadRequestException('User not found');
        }

        // compare password here
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }


        // get apiKey here
        const apiKey = await this.apiKeyService.findByUserId(existingUser._id);

        if (!apiKey) {
            throw new BadRequestException('Unauthorized');
        }

        // generate jwt token here
        const payload = {
            userId: existingUser._id,
            email: existingUser.email,
        }
        const tokens = await generateToken({
            payload,
            privateKey: apiKey.privateKey,
            publicKey: apiKey.publicKey
        })

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: existingUser._id,
                email: existingUser.email,
                fullname: existingUser.fullname
            }
        }
    }
}
