import { Controller, Get, Post, Query } from "@nestjs/common";
import { GeminiService } from "./gemini.service";

@Controller('gemini')
export class GeminiController {
    constructor(
        private readonly geminiService: GeminiService,
    ) {
    }
    @Post('generate-script')
    async generateScript(@Query('input') input: string) {
        return await this.geminiService.generateScript({
            input
        })
    }
}
    