import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService
  ) { }


  matchRoles(roles: string[], userRole: string): boolean {
    
    for (let role in roles) {
        if (roles[role] === userRole) {
        return true;
      }
    }
    return false;
  }


  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const tokenData = request.rawHeaders[1].split(' ')[1];
    const payload = JSON.parse(JSON.stringify(this.jwtService.decode(tokenData)));
    return this.matchRoles(roles, payload.role);
  }
}