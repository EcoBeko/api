import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ModerationService } from "../services/moderation.service";

@ApiTags("moderation")
@Controller("moderation")
export class ModerationController {
  @Inject(ModerationService)
  private readonly service: ModerationService;

  @HttpCode(HttpStatus.OK)
  @Post("/authenticate")
  @ApiOperation({
    summary: "Checks, whether given credentials are for moderator",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  @ApiResponse({
    status: 400,
    description: "Bad credentials",
  })
  public async isModerator(
    @Body("username") username: string,
    @Body("password") password: string,
  ) {
    const condition = await this.service.isModerator(username, password);
    if (!condition) throw new BadRequestException("Bad credentials");

    return {
      token: this.service.generateAccessToken(),
    };
  }

  @Post("/projects")
  @ApiOperation({
    summary: "Creates project",
  })
  @ApiResponse({
    status: 201,
    description: "Created",
  })
  @ApiResponse({
    status: 400,
    description: "Bad credentials",
  })
  public async addProject(
    @Body("title") title: string,
    @Body("image_path") image_path: string,
    @Body("description") description: string,
    @Body("link") link: string,
  ) {
    return this.service.addProject(title, description, image_path, link);
  }

  @Get("/projects")
  @ApiOperation({
    summary: "Get projects",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public async getProjects() {
    return this.service.getProjects();
  }

  @Put("/projects/:id")
  @ApiOperation({
    summary: "Get projects",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public async updateProject(
    @Param("id") id: string,
    @Body("status") status: string,
  ) {
    return this.service.updateProject(id, status);
  }
}
