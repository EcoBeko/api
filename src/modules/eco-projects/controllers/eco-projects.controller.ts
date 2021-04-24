import { Protected } from "@/core/decorators/protected.decorator";
import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EcoProjectsService } from "../services/eco-projects.service";

@Protected()
@ApiTags("eco-projects")
@Controller("eco-projects")
export class EcoProjectsController {
  @Inject(EcoProjectsService)
  private readonly service: EcoProjectsService;

  @Get("/")
  @ApiOperation({
    summary: "Search eco-projects",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public async getCommunities(
    @Query("title") title: string,
    @Query("status") status: string,
  ) {
    return this.service.search(title, status);
  }
}
