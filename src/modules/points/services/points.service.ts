import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PointsService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async getPoints(city: string, type: string, ids: string[]) {
    return this.db.query("select * from f_search_recycling_points($1,$2,$3)", [
      city,
      type,
      ids,
    ]);
  }
}
