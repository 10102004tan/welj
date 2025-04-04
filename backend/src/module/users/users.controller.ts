import { Body, Controller, Get, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(private readonly usersService:UsersService){}

    @Get('info')
    async getUser(@Request() req:any){
        const user = await this.usersService.findOne(req.user.userId);
        return user;
    }
}
