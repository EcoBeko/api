import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import { Inject, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@Injectable()
export class ModerationService {
  @Inject(PGPoolService)
  private readonly db: PGPoolService;

  public async isModerator(username: string, password: string) {
    const [admin] = await this.db.query(
      `select * from users
       where "role" = 'moderator'
        and username = $1`,
      [username],
    );

    return !!admin && (await bcrypt.compare(password, admin.password));
  }

  public generateAccessToken() {
    return jwt.sign({}, "super_secret_moderator", {
      algorithm: "HS256",
    });
  }

  public async addProject(
    title: string,
    description: string,
    image_path: string,
    link: string,
  ) {
    const [
      result,
    ] = await this.db.query("call p_create_eco_project($1,$2,$3,$4)", [
      title,
      image_path,
      description,
      link,
    ]);

    return result;
  }

  public async updateProject(id: string, status: string) {
    const [result] = await this.db.query("call p_update_eco_projects($1,$2)", [
      id,
      status,
    ]);

    return result;
  }

  public async getProjects() {
    return this.db.query("select * from f_get_eco_projects()");
  }
}
