import { Module } from "@nestjs/common";
import { PoolModule } from "./core/pool/pool.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [PoolModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
