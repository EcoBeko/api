import { AuthorType, PostType } from "@/@types";
import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async createPost(
    content: any,
    postType: PostType,
    authorType: AuthorType,
    authorId: string,
    attachments: string[],
  ) {
    const result = await this.db.query("call p_create_post($1,$2,$3,$4,$5)", [
      content,
      postType,
      authorType,
      authorId,
      attachments,
    ]);
    return result[0];
  }

  public async getUserFeed(userId: string) {
    return await this.db.query("select * from f_get_user_feed($1)", [userId]);
  }
}
