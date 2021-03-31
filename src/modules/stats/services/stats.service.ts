import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class StatsService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async getTypes() {
    return this.db.query("select * from f_get_stats_types()");
  }

  public async getUserStats(id: string) {
    return this.db.query("select * from f_get_user_stats($1)", [id]);
  }

  public async getGlobalStats() {
    return this.db.query("select * from f_get_global_stats()");
  }
}
