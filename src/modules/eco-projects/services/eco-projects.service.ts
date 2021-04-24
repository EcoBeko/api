import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class EcoProjectsService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async search(title: string, status: string) {
    return this.db.query("select * from f_search_eco_projects($1,$2)", [
      title,
      status,
    ]);
  }
}
