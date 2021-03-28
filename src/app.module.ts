import { Module } from "@nestjs/common";
import { PoolModule } from "./core/pool/pool.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [PoolModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
