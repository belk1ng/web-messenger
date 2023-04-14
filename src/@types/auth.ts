export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  display_name: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
}

export type AuthUser = Omit<User, "password">;

export type LoginValues = Pick<User, "login" | "password">;

export type RegistrationValues = Omit<
  User,
  "avatar" | "display_name" | "id"
> & {
  confirm_password: string;
};

export enum AUTH_ENDPOINTS {
  "LOGIN" = "/signin",
  "LOGOUT" = "/logout",
  "REGISTRATION" = "/signup",
  "USER_INFO" = "/user",
}
