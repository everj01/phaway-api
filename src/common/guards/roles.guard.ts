import { CanActivate, ExecutionContext, Injectable, ForbiddenException} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { UserRole } from "generated/prisma/enums";

// CanActive (Interface) helps to specify that this class will be an Guard

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());

        if(!requiredRoles || requiredRoles.length === 0){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('No tienes permiso para acceder a este recurso');
        }

        return true;
    }
}