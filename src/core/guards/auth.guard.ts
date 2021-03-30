import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import jwt from "jsonwebtoken";
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers["authorization"]?.split(" ")[1] || "";

    try {
      const user = jwt.verify(token, "super_secret", {
        algorithms: ["HS256"],
      }) as any;

      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
