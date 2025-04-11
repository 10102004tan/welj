import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { RbacService } from "./rbac.service";
import { CreateRoleDto, UpdateRoleDto } from "./dto/role.dto";
import { CreateResourceDto } from "./dto/create-resource.dto";

@Controller("rbac")
export class RbacController {
    constructor(
        private readonly rbacService: RbacService,
    ) {}

    @Post("role")
    async createRole(@Body() payload: CreateRoleDto) {
        return await this.rbacService.createRole(payload);
    }

    @Post("resource")
    async createResource(@Body() payload: CreateResourceDto) {
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
    async updateRole(@Body() payload: UpdateRoleDto) {
        return await this.rbacService.updateRole(payload);
    }
}