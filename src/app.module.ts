import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PoolModule } from "./core/pool/pool.module";
import { ImagesModule } from "./modules/images/images.module";
import { PostsModule } from "./modules/posts/posts.module";
import { StatsModule } from "./modules/stats/stats.module";
import { UsersModule } from "./modules/users/users.module";
import { join } from "path";
import { PointsModule } from "./modules/points/points.module";
import { CommunitiesModule } from "./modules/communities/communities.module";
import { EcoProjectsModule } from "./modules/eco-projects/eco-projects.module";

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
    PostsModule,
    PointsModule,
    CommunitiesModule,
    EcoProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
