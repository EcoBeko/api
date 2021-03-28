import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";

export function Protected() {
  return applyDecorators(UseGuards(AuthGuard));
}
