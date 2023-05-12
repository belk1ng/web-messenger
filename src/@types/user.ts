import { User } from "./auth";

export enum USER_ENDPOINTS {
  "UPDATE_INFO" = "/profile",
  "AVATAR" = "/profile/avatar",
  "UPDATE_PASSWORD" = "/password",
  "SEARCH" = "/search",
}

export type ProfileAvatarValues = FormData;

export type ProfileDataValues = Omit<User, "id" | "password" | "avatar">;

export interface ProfilePasswordsValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
