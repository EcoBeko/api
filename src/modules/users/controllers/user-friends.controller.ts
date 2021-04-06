import { Protected } from "@/core/decorators/protected.decorator";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserFriendsService } from "../services/user-friends.service";

@Protected()
@ApiTags("friends")
@Controller("friends")
export class UserFriendsController {
  @Inject(UserFriendsService)
  private readonly service: UserFriendsService;

  @Get("/:user_id/friend/:friend_id")
  @ApiOperation({
    summary: "Return friend by id",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  public getFriend(
    @Param("user_id") userId: string,
    @Param("friend_id") friendId: string,
  ) {
    return this.service.getFriend(userId, friendId);
  }

  @HttpCode(HttpStatus.OK)
  @Put("/:user_id/friend/:friend_id")
  @ApiOperation({
    summary: "Update friendship status",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public updateStatus(
    @Param("user_id") userId: string,
    @Param("friend_id") friendId: string,
    @Body("status") status: string,
  ) {
    return this.service.updateStatus(userId, friendId, status);
  }

  @Get("/:user_id")
  @ApiOperation({
    summary: "Return list of friends by user id",
  })
  @ApiResponse({
    status: 200,
    description: "Ok",
  })
  public getUserFriends(@Param("user_id") userId: string) {
    return this.service.getUserFriends(userId);
  }
}
