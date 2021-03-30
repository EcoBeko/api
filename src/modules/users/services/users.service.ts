import { IUser, UserGender, UserRole } from "@/@types";
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
    const user = await this.getUserByUsername(username, role);
    if (!user) throw new NotFoundException("User not found");

    const equals = await bcrypt.compare(password, user.password);
    if (!equals) throw new BadRequestException("Passwords do not match");

    return {
      user: this.getPasswordlessUser(user),
      token: this.generateAccessToken(user),
    };
  }

  public async getUserById(id: string): Promise<IUser> {
    const [user] = await this.db.query("select * from users where id = $1", [
      id,
    ]);

    return user;
  }

  public async getUserByUsername(
    username: string,
    role: UserRole,
  ): Promise<IUser> {
    const [user] = (await this.db.query(
      `
      select * from users
      where username = $1
      and role = $2      
    `,
      [username, role],
    )) as IUser[];

    return user;
  }

  public generateAccessToken(user: IUser) {
    return jwt.sign(user, "super_secret", {
      algorithm: "HS256",
    });
  }

  public getPasswordlessUser(user: any): Omit<IUser, "password"> {
    delete user["password"];
    return user;
  }

  public async isUserExists(
    username: string,
    role: UserRole,
  ): Promise<boolean> {
    const [
      result,
    ] = await this.db.query("select * from f_is_username_exists($1, $2)", [
      username,
      role,
    ]);

    return result.f_is_username_exists;
  }

  public async createUser(
    first_name: string,
    last_name: string,
    username: string,
    password: string,

    gender: UserGender,
    role: UserRole,
  ) {
    const isExists = await this.isUserExists(username, role);
    if (isExists) throw new BadRequestException("Username exists");

    const [
      result,
    ] = await this.db.query(
      "call public.p_create_user($1,$2,$3,$4,$5,$6,$7);",
      [first_name, last_name, username, password, gender, null, role],
    );

    const user = await this.getUserById(result._id);

    return {
      user: this.getPasswordlessUser(user),
      token: this.generateAccessToken(user),
    };
  }
}
