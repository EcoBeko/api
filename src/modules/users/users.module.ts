import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";
import { UserFriendsController } from "./controllers/user-friends.controller";
import { UsersController } from "./controllers/users.controller";
import { AdminService } from "./services/admin.service";
import { UserFriendsService } from "./services/user-friends.service";
import { UsersService } from "./services/users.service";

@Module({
  controllers: [UsersController, UserFriendsController, AdminController],
  providers: [UsersService, UserFriendsService, AdminService],
})
export class UsersModule {}
