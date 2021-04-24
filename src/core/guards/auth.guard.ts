import { UserRole } from "@/@types";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import jwt from "jsonwebtoken";
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly role: UserRole;
  public constructor(role: UserRole) {
    this.role = role;
  }

  public get secret() {
    return {
      user: "super_secret",
      admin: "super_secret_admin",
      moderator: "super_secret_moderator",
    }[this.role];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers["authorization"]?.split(" ")[1] || "";

    try {
      const user = jwt.verify(token, this.secret, {
        algorithms: ["HS256"],
      }) as any;

      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
