import { Protected } from "@/core/decorators/protected.decorator";
import { Controller, Get, Inject, Query } from "@nestjs/common";
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
}
