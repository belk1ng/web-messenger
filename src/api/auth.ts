import axios from "./axios";
import catcher from "./catcher";
import { MethodResponse } from "../@types/api";
import {
  LoginValues,
  RegistrationValues,
  AuthUser,
  AUTH_ENDPOINTS,
} from "../@types/auth";

class AuthAPI {
  private static AUTH_PREFIX = "/auth";

  @catcher
  static async login(values: LoginValues): MethodResponse<string> {
    return axios.post<string>(
      `${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.LOGIN}`,
      values
    );
  }

  @catcher
  static async register(
    values: RegistrationValues
  ): MethodResponse<Pick<AuthUser, "id">> {
    return axios.post<Pick<AuthUser, "id">>(
      `${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.REGISTRATION}`,
      values
    );
  }

  @catcher
  static async logout(): MethodResponse<string> {
    return axios.post<string>(`${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.LOGOUT}`);
  }

  @catcher
  static async getUser(): MethodResponse<AuthUser> {
    return axios.get<AuthUser>(
      `${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.USER_INFO}`
    );
  }
}

export default AuthAPI;
