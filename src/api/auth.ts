import axios from "./axios";
import catcher from "./catcher";
import { MethodResponse } from "../@types/api";
import { LoginValues } from "../@types/auth";

class AuthAPI {
  static AUTH_PREFIX = "/auth";

  @catcher
  static async login<T = string>(values: LoginValues): MethodResponse<T> {
    const response = await axios.post(`${AuthAPI.AUTH_PREFIX}/signin`, values);
    const { data, status } = response;

    return { data, status };
  }
}

export default AuthAPI;
