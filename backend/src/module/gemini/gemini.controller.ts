import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { GeminiService } from "./gemini.service";
import { Role } from "src/common/enums/role.enum";
import { AccessGuard } from "../rbac/access.guard";
import { Grant } from "../rbac/grants.decorator";
import { Action } from "src/common/enums/action.enum";

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

    @Get('readAny')
    @UseGuards(AccessGuard)
    @Grant(Action.READ_ANY,"gemini")
    async readAny() {
        return {
            message: 'test success',
            status: 200,
            data:[]
        }
    }

    @Get('readOwn')
    @UseGuards(AccessGuard)
    @Grant(Action.READ_OWN,"gemini")
    async readOwn() {
        return {
            message: 'test success',
            status: 200,
            data:{}
        }
    }
}
    