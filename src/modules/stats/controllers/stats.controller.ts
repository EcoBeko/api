import { Protected } from "@/core/decorators/protected.decorator";
import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
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

  @Get("/waste-types")
  @ApiOperation({
    summary: "Get waste types",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async getWasteTypes() {
    return this.service.getWasteTypes();
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Get user stats",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async getUserStats(@Param("id") id: string) {
    return this.service.getUserStats(id);
  }

  @Post("/")
  @ApiOperation({
    summary: "Add stats record",
  })
  @ApiResponse({ status: 201, description: "Created" })
  public async addStatsRecord(
    @Body("userId") userId: string,
    @Body("wasteTypeId") wasteTypeId: string,
    @Body("amount") amount: number,
  ) {
    return this.service.addStatsRecord(userId, wasteTypeId, amount);
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
