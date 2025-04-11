import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { RbacService } from "./rbac.service";

@Controller("rbac")
export class RbacController {
    constructor(
        private readonly rbacService: RbacService,
    ) {}

    @Post("role")
    async createRole(@Body() payload: any) {
        return await this.rbacService.createRole(payload);
    }

    @Post("resource")
    async createResource(@Body() payload: any) {
        return await this.rbacService.createResource(payload);
    }

    @Get("roles")
    async getAllRoles() {
        return await this.rbacService.getAllRoles();
    }

    @Get("resources")
    async getAllResources() {
        return await this.rbacService.getAllResources();
    }

    @Put("role")
    async updateRole(@Body() payload: any) {
        return await this.rbacService.updateRole(payload);
    }
}