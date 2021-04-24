import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";
import { ModerationController } from "./controllers/moderation.controller";
import { UserFriendsController } from "./controllers/user-friends.controller";
import { UsersController } from "./controllers/users.controller";
import { AdminService } from "./services/admin.service";
import { ModerationService } from "./services/moderation.service";
import { UserFriendsService } from "./services/user-friends.service";
import { UsersService } from "./services/users.service";

@Module({
  controllers: [
    UsersController,
    UserFriendsController,
    AdminController,
    ModerationController,
  ],
  providers: [
    UsersService,
    UserFriendsService,
    AdminService,
    ModerationService,
  ],
})
export class UsersModule {}
