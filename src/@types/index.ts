export enum UserGender {
  MALE = "male",
  FEMALE = "female",
}

export enum UserRole {
  USER = "user",
  MODERATOR = "moderator",
  admin = "admin",
}

export enum GenericStatus {
  ENABLED = "enabled",
  DISABLED = "disabled",
}

export interface IUser {
  id: string;
  first_name?: string;
  last_name?: string;
  username: string;
  password: string;
  gender: UserGender;
  avatar: string;
  role: UserRole;
  status: GenericStatus;
}
