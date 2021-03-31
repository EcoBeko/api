import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PoolModule } from "./core/pool/pool.module";
import { ImagesModule } from "./modules/images/images.module";
import { StatsModule } from "./modules/stats/stats.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/static",
      exclude: ["/api*"],
    }),
    PoolModule,
    ImagesModule,
    UsersModule,
    StatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
