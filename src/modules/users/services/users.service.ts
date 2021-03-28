import { IUser, UserRole } from "@/@types";
import { PGPoolService } from "@/core/pool/services/pg-pool.service";
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@Injectable()
export class UsersService {
  @Inject(PGPoolService)
  private db: PGPoolService;

  public async authenticate(
    username: string,
    password: string,
    role: UserRole,
  ) {
    const result = await this.db.pool.query(
      `
      select * from users
      where username = $1
      and role = $2      
    `,
      [username, role],
    );
    const [user] = result.rows as IUser[];

    if (!user) throw new NotFoundException("User not found");

    const equals = await bcrypt.compare(password, user.password);
    if (!equals) throw new BadRequestException("Passwords do not match");

    return {
      user: {
        ...user,
        password: undefined,
      },
      token: jwt.sign(user, "super_secret"),
    };
  }
}
