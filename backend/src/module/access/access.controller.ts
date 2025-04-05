import { Body, Controller, Get, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccessService } from './access.service';
import { CookieService } from '../cookie/cookie.service';
import { Response } from 'express';

@Controller('auth')
export class AccessController {

    constructor(private readonly accessService: AccessService,
        private readonly cookieService: CookieService
    ) { }

    @Post('sign-in')
    async signIn(@Body() body: any, @Res({ passthrough: true }) response: Response) {
        const data = await this.accessService.signIn(body);
        const { accessToken, user:{id} ,refreshToken} = data as any;
        this.cookieService.setAuthCookie(response, { accessToken, id, refreshToken });
        return data;

    }

    @Post('sign-up')
    signUp(@Body() body: any) {
        return this.accessService.signUp(body);
    }

    @Get('check-auth')
    checkAuth() {
        return { message: 'Authenticated' };
    }
}
