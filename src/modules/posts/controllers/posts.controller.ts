import { AuthorType, PostType } from "@/@types";
import { Protected } from "@/core/decorators/protected.decorator";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostsService } from "../services/posts.service";

@Protected()
@ApiTags("images")
@Controller("posts")
export class PostsController {
  @Inject(PostsService)
  private readonly service: PostsService;

  @Post("/")
  @ApiOperation({
    summary: "Create article or post",
  })
  @ApiResponse({ status: 201, description: "Created" })
  public async createPost(
    @Body("content") content: any,
    @Body("postType") postType: PostType,
    @Body("authorType") authorType: AuthorType,
    @Body("authorId") authorId: string,
    @Body("attachments") attachments: string[],
  ) {
    return this.service.createPost(
      content,
      postType,
      authorType,
      authorId,
      attachments,
    );
  }

  @Get("/:user_id/feed")
  @ApiOperation({
    summary: "Fetch user feed",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async getUserFeed(@Param("user_id") userId: string) {
    return this.service.getUserFeed(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Put("/:post_id/likes")
  @ApiOperation({
    summary: "Updates like status for user",
  })
  @ApiResponse({ status: 200, description: "Ok" })
  public async updateLikes(
    @Param("post_id") postId: string,
    @Body("userId") userId: string,
  ) {
    return this.service.setLike(postId, userId);
  }
}
