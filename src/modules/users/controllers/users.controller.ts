import { IUser, UserRole } from "@/@types";
import { GetUser } from "@/core/decorators/get-user.decorator";
import { Protected } from "@/core/decorators/protected.decorator";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../services/users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  @Inject(UsersService)
  private service: UsersService;

  @Protected()
  @Get("info")
  @ApiOperation({
    summary: "Get user info from token",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async info(@GetUser() user: IUser) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post("authenticate")
  @ApiOperation({
    summary: "Авторизация пользователя",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  @ApiResponse({ status: 400, description: "Passwords do not match" })
  @ApiResponse({ status: 404, description: "User not found" })
  public async authenticate(
    @Body("username") username: string,
    @Body("password") password: string,
    @Body("role") role: UserRole,
  ) {
    return this.service.authenticate(username, password, role);
  }
}
