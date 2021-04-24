import { UserRole } from "@/@types";
import { Protected } from "@/core/decorators/protected.decorator";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminService } from "../services/admin.service";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  @Inject(AdminService)
  private readonly service: AdminService;

  @HttpCode(HttpStatus.OK)
  @Post("/authenticate")
  @ApiOperation({
    summary: "Checks, whether given credentials are for admin",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  @ApiResponse({
    status: 400,
    description: "Bad credentials",
  })
  public async isAdmin(
    @Body("username") username: string,
    @Body("password") password: string,
  ) {
    const condition = await this.service.isAdmin(username, password);
    if (!condition) throw new BadRequestException("Bad credentials");

    return {
      token: this.service.generateAccessToken(),
    };
  }

  @Protected(UserRole.ADMIN)
  @Get("/moderators")
  @ApiOperation({
    summary: "Get moderators",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public async getModerators() {
    return this.service.getModerators();
  }

  @Protected(UserRole.ADMIN)
  @Post("/moderators")
  @ApiOperation({
    summary: "Add moderator",
  })
  @ApiResponse({
    status: 201,
    description: "Created",
  })
  public async addModerator(
    @Body("username") username: string,
    @Body("password") password: string,
  ) {
    return this.service.addModerator(username, password);
  }

  @HttpCode(HttpStatus.OK)
  @Protected(UserRole.ADMIN)
  @Delete("/moderators/:id")
  @ApiOperation({
    summary: "Delete moderator",
  })
  @ApiResponse({
    status: 200,
    description: "Deleted",
  })
  public async removeModerator(@Param("id") id: string) {
    return this.service.removeModerator(id);
  }
}
