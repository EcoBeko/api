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
import { CommunitiesService } from "../services/communities.service";

@Protected()
@ApiTags("communities")
@Controller("communities")
export class CommunitiesController {
  @Inject(CommunitiesService)
  private readonly service: CommunitiesService;

  @Get("/")
  @ApiOperation({
    summary: "Get filtered list of communities",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public async getCommunities(
    @Query("title") title: string,
    @Query("description") description: string,
  ) {
    return this.service.getCommunities(title, description);
  }

  @Post("/")
  @ApiOperation({
    summary: "Create a community",
  })
  @ApiResponse({
    status: 201,
    description: "Created",
  })
  public async create(
    @Body("userId") userId: string,
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("imagePath") imagePath: string,
  ) {
    return this.service.create(userId, title, description, imagePath);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Get community by id",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  @ApiResponse({
    status: 404,
    description: "Not found",
  })
  public async getCommunity(
    @Query("userId") userId: string,
    @Param("id") id: string,
  ) {
    return this.service.getCommunity(userId, id);
  }

  @Get("/:id/subs")
  @ApiOperation({
    summary: "Get community subs",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public async getCommunitySubs(@Param("id") id: string) {
    return this.service.getSubs(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put("/:id/subs/:user_id")
  @ApiOperation({
    summary: "Update sub status",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public async updateStatus(
    @Param("id") id: string,
    @Param("user_id") userId: string,
    @Body("status") status: string,
  ) {
    return this.service.updateStatus(id, userId, status);
  }

  @Post("/:id/subs/:user_id")
  @ApiOperation({
    summary: "Subscribe user to a community",
  })
  @ApiResponse({
    status: 201,
    description: "Subscribed",
  })
  public async subscribe(
    @Param("id") id: string,
    @Param("user_id") userId: string,
  ) {
    return this.service.subscribe(id, userId);
  }
}
