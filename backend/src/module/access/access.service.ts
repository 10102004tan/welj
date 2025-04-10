import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcryptjs';
import { ApiKeyService } from '../apiKey/apiKey.service';
import { generateToken } from 'src/auth';
import { RbacService } from '../rbac/rbac.service';
import { UserRepo } from '../user/schemas/repo/user.repo';
const {v4: uuidv4} = require('uuid')


@Injectable()
export class AccessService {

    constructor(
        private readonly userService: UsersService,
        private readonly apiKeyService:ApiKeyService,
        private readonly rbacService:RbacService,
        private readonly userRepo:UserRepo,
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

        if (!hashedPassword) {
            throw new BadRequestException('Password hashing failed');
        }

        // find role here
        const role = await this.rbacService.getRoleBySlug("role002");
        if (!role) {
            throw new BadRequestException('create wrong account !!!');
        }


        const newUser = await this.userService.create({email, password:hashedPassword,fullname,user_role:role._id});
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
        const existingUser = await this.userRepo.findUserByEmail({email, select:["email", "fullname", "password"]});
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

        const {slug} = existingUser.user_role as any;

        // generate jwt token here
        const payload = {
            userId: existingUser._id,
            email: existingUser.email,
            role:slug
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
