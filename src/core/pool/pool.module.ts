import { Module, Global } from "@nestjs/common";

import { PGPoolService } from "./services/pg-pool.service";

@Global()
@Module({
  controllers: [],
  providers: [PGPoolService],
  exports: [PGPoolService],
})
export class PoolModule {}
