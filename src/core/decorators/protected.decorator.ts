import { UserRole } from "@/@types";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";

export function Protected(role?: UserRole) {
  return applyDecorators(UseGuards(new AuthGuard(role)));
}
