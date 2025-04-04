import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccessService } from './access.service';

@Controller('auth')
export class AccessController {

    constructor(private readonly accessService:AccessService){}

    @Post('sign-in')
    signIn(@Body() body: any) {
        return this.accessService.signIn(body);
    }

    @Post('sign-up')
    signUp(@Body() body: any) {
        return this.accessService.signUp(body);
    }
}
