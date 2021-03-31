import { Protected } from "@/core/decorators/protected.decorator";
import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StatsService } from "../services/stats.service";

@Protected()
@ApiTags("stats")
@Controller("stats")
export class StatsController {
  @Inject(StatsService)
  private readonly service: StatsService;

  @Get("/types")
  @ApiOperation({
    summary: "Get stats types",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async getTypes() {
    return this.service.getTypes();
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Get user stats",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async getUserStats(@Param("id") id: string) {
    return this.service.getUserStats(id);
  }

  @Get("/")
  @ApiOperation({
    summary: "Get user stats",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async getGlobalStats() {
    return this.service.getGlobalStats();
  }
}
