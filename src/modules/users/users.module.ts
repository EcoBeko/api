import { Module } from "@nestjs/common";
import { UserFriendsController } from "./controllers/user-friends.controller";
import { UsersController } from "./controllers/users.controller";
import { UserFriendsService } from "./services/user-friends.service";
import { UsersService } from "./services/users.service";

@Module({
  controllers: [UsersController, UserFriendsController],
  providers: [UsersService, UserFriendsService],
})
export class UsersModule {}
