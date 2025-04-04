import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class SystemController {


    @Get('health-check')
    heathCheck() {
        return { message: 'ok' };
    }
}
