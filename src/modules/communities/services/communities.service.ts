import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CommunitiesService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async getCommunities(title: string, description: string) {
    return this.db.query("select * from f_search_communities($1,$2)", [
      title,
      description,
    ]);
  }

  public async getCommunity(userId: string, id: string) {
    const [
      community,
    ] = await this.db.query("select * from f_get_community($1,$2)", [
      userId,
      id,
    ]);

    if (!community) throw new NotFoundException("Community not found");

    return community;
  }

  public async create(
    userId: string,
    title: string,
    description: string,
    imagePath: string,
  ) {
    const [result] = await this.db.query(
      "call p_create_community($1,$2,$3,$4)",
      [title, imagePath, description, userId],
    );

    return result;
  }

  public async getSubs(id: string) {
    return this.db.query("select * from f_get_subs($1)", [id]);
  }

  public async updateStatus(id: string, userId: string, status: string) {
    return this.db.query("call p_update_sub_status($1,$2,$3)", [
      userId,
      id,
      status,
    ]);
  }

  public async subscribe(id: string, userId: string) {
    return this.db.query("call p_subscribe_user($1,$2)", [userId, id]);
  }
}
