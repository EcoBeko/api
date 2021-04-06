import { IUser, UserGender, UserRole } from "@/@types";
import { GetUser } from "@/core/decorators/get-user.decorator";
import { Protected } from "@/core/decorators/protected.decorator";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
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
    return this.service.getPasswordlessUser(this.service.getUserById(user.id));
  }

  @HttpCode(HttpStatus.OK)
  @Post("authenticate")
  @ApiOperation({
    summary: "Authorize user",
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

  @Post("/")
  @ApiOperation({
    summary: "Create user",
  })
  @ApiResponse({ status: 201, description: "Created" })
  @ApiResponse({ status: 400, description: "User exists" })
  public async create(
    @Body("first_name") first_name: string,
    @Body("last_name") last_name: string,
    @Body("username") username: string,
    @Body("password") password: string,
    @Body("gender") gender: UserGender,
    @Body("role") role: UserRole,
  ) {
    return this.service.createUser(
      first_name,
      last_name,
      username,
      password,
      gender,
      role,
    );
  }

  @Protected()
  @HttpCode(HttpStatus.OK)
  @Put("/:id")
  @ApiOperation({
    summary: "Update user",
  })
  @ApiResponse({ status: 200, description: "Updated" })
  public async update(
    @Param("id") id: string,
    @Body("first_name") first_name: string,
    @Body("last_name") last_name: string,
    @Body("password") password: string,
    @Body("gender") gender: UserGender,
    @Body("role") role: UserRole,
    @Body("avatar") avatar: string,
  ) {
    return this.service.updateUser(
      id,
      first_name,
      last_name,
      password,
      gender,
      role,
      avatar,
    );
  }

  @Protected()
  @Get("/")
  @ApiOperation({
    summary: "Get users by filter",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public getUsers(
    @Query("firstName") firstName: string,
    @Query("lastName") lastName: string,
    @Query("gender") gender: string,
  ) {
    return this.service.getUsers(firstName, lastName, gender);
  }
}
