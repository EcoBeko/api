import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserFriendsService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async getUserFriends(userId: string) {
    return this.db.query("select * from f_get_friends($1)", [userId]);
  }

  public async getFriend(userId: string, friendId: string) {
    const [user] = await this.db.query("select * from f_get_friend($1,$2);", [
      userId,
      friendId,
    ]);

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  public async updateStatus(userId: string, friendId: string, status: string) {
    return this.db.query("call p_update_friend_status($1,$2,$3)", [
      userId,
      friendId,
      status,
    ]);
  }

  public async getUserRecommendations(userId: string) {
    return this.db.query("select * from f_get_user_recommendations($1)", [
      userId,
    ]);
  }
}
