import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CommunitiesService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async getCommunities(title: string, description: string) {
    return this.db.query(
      "select * from f_search_communities($1,$2)",
      [title, description],
    );
  }
}
