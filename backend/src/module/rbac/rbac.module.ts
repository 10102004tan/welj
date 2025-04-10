import { Module, Res } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "./schemas/role.schema";
import { RbacService } from "./rbac.service";
import { RbacController } from "./rbac.controller";
import { Resource, ResourceSchema } from "./schemas/resource.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }])],
    controllers: [RbacController],
    providers: [RbacService],
    exports: [RbacService],
})

export class RbacModule { }