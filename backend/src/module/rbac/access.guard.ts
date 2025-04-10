import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RbacService } from "./rbac.service";
import { GRANT_KEY } from "./grants.decorator";
import { AccessControl } from "accesscontrol";
import { Action } from "src/common/enums/action.enum";


@Injectable()
export class AccessGuard implements CanActivate {
    constructor(private reflector: Reflector,
      private readonly rbacService:RbacService
    ) {}
     async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredGrant = this.reflector.getAllAndOverride<any>(GRANT_KEY, [
            context.getHandler(), // get route handler function
            context.getClass(),// get controller class
          ]);
      
        if (!requiredGrant) {
            return true;
        }

        const { action, resource } = requiredGrant as {action:string,resource:string}; // get action and resource from decorator
        const { user : {role}} = context.switchToHttp().getRequest(); // get user from request

        const roleFound = await this.rbacService.getRoleBySlug(role); // get role from database
        if (!roleFound) return false

        const roleName = roleFound.name

        const rbac = new AccessControl(await this.rbacService.getAllRoles())
        const permission = rbac.can(roleName)[action as Action](resource); // check permission
        if (!permission.granted) {
            return false
        }
        
        return true
    }
}