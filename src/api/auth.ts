import instance from "./axios";
import axios from "axios";
import { ServerResponse } from "../@types/api";
import { LoginValues } from "../@types/auth";

class AuthAPI {
  static AUTH_PREFIX = "/auth";

  static async login<T = string>(
    values: LoginValues
  ): Promise<ServerResponse<T> | undefined> {
    try {
      const response = await instance.post(
        `${AuthAPI.AUTH_PREFIX}/signin`,
        values
      );
      const { data, status } = response;

      return { data, status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          data: error.response?.data as T,
          status: error?.response?.status as number,
        };
      } else {
        console.log("Unexpecred error: ", error);
      }
    }
  }
}

export default AuthAPI;
