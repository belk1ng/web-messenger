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
    const response = await axios.post<string>(
      `${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.LOGIN}`,
      values
    );
    const { data, status } = response;

    return { data, status };
  }

  @catcher
  static async register(
    values: RegistrationValues
  ): MethodResponse<Pick<AuthUser, "id">> {
    const response = await axios.post<Pick<AuthUser, "id">>(
      `${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.LOGIN}`,
      values
    );
    const { data, status } = response;

    return { data, status };
  }

  @catcher
  static async logout(): MethodResponse<string> {
    const response = await axios.post<string>(
      `${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.LOGOUT}`
    );
    const { data, status } = response;

    return { data, status };
  }

  @catcher
  static async getUser(): MethodResponse<AuthUser> {
    const response = await axios.get<AuthUser>(
      `${AuthAPI.AUTH_PREFIX}${AUTH_ENDPOINTS.USER_INFO}`
    );
    const { data, status } = response;

    return { data, status };
  }
}

export default AuthAPI;
