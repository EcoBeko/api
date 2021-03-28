import { Injectable } from "@nestjs/common";
import pg from "pg";
import { ConnectionConfig, Pool } from "pg";

@Injectable()
export class PGPoolService {
  constructor() {
    this.setTypes();
    this.pool = this.getPool();
  }

  pool: Pool;
  connectionConfig: ConnectionConfig = {
    port: 5432,
    connectionTimeoutMillis: 5000,
    host: "eco-beko.ryspekov.life",
    database: "ecobeko",
    user: "postgres",
    password: "super_secret",
  };

  public async healthCheck() {
    const res = await this.pool.query("select version()");
    return res.rows;
  }

  private getPool() {
    return new pg.Pool(this.connectionConfig);
  }

  // just use the built-in V8 implementation
  private setTypes() {
    pg.types.setTypeParser(700, "text", parseFloat);
    pg.types.setTypeParser(701, "text", parseFloat);
    pg.types.setTypeParser(1700, "text", parseFloat);
  }
}
