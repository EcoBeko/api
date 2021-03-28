import { Module } from "@nestjs/common";
import { PoolModule } from "./core/pool/pool.module";

@Module({
  imports: [PoolModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
