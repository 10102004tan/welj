import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GeminiService } from "./gemini.service";
import { GeminiController } from "./gemini.controller";
import { Authentication } from "src/auth";
import { RbacModule } from "../rbac/rbac.module";

@Module({
    imports:[RbacModule],
    providers: [GeminiService],
    controllers: [GeminiController],
})
export class GeminiModule {}