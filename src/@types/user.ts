import { User } from "./auth";

export enum USER_ENDPOINTS {
  "UPDATE_INFO" = "/profile",
  "AVATAR" = "/profile/avatar",
  "UPDATE_PASSWORD" = "/password",
  "SEARCH" = "/search",
}

export interface ProfileAvatarValues {
  avatar: File;
}

export type ProfileDataValues = Omit<User, "id" | "password" | "avatar">;
