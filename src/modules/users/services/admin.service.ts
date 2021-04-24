import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async isAdmin(username: string, password: string) {
    const [admin] = await this.db.query(
      `select * from users
       where "role" = 'admin'
        and username = $1`,
      [username],
    );

    return !!admin && (await bcrypt.compare(password, admin.password));
  }

  public generateAccessToken() {
    return jwt.sign({}, "super_secret_admin", {
      algorithm: "HS256",
    });
  }

  public async getModerators() {
    return this.db.query(
      "select id, username, status from users where role = 'moderator' and status = 'enabled'",
    );
  }

  public async removeModerator(id: string) {
    return this.db.query(
      "delete from users where role = 'moderator' and status = 'enabled' and id=$1",
      [id],
    );
  }

  public async addModerator(username: string, password: string) {
    const hashed = await bcrypt.hash(password, await bcrypt.genSalt());
    return this.db.query(
      `insert into users(username, "password", "role", status)
       values ($1, $2, 'moderator', 'enabled')`,
      [username, hashed],
    );
  }
}
