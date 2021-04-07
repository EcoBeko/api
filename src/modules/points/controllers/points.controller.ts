import { Protected } from "@/core/decorators/protected.decorator";
import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PointsService } from "../services/points.service";

@Protected()
@ApiTags("points")
@Controller("points")
export class PointsController {
  @Inject(PointsService)
  private readonly service: PointsService;

  @Post("/:city")
  @ApiOperation({
    summary: "Get recycling points",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public getPoints(
    @Param("city") city: string,
    @Body("type") type: string,
    @Body("ids") ids: string[],
  ) {
    return this.service.getPoints(city, type, ids);
  }
}
