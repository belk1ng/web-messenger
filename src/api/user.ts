import axios from "./axios";
import catcher from "./catcher";
import { MethodResponse } from "../@types/api";
import {
  USER_ENDPOINTS,
  ProfileAvatarValues,
  ProfileDataValues,
  ProfilePasswordsValues,
} from "../@types/user";
import { AuthContextUser } from "../@types/auth";

class UserAPI {
  private static USER_PREFIX = "/user";

  @catcher
  static async updateAvatar(
    values: ProfileAvatarValues
  ): MethodResponse<AuthContextUser> {
    return axios.put<AuthContextUser>(
      `${UserAPI.USER_PREFIX}${USER_ENDPOINTS.AVATAR}`,
      values
    );
  }

  @catcher
  static async updateProfileData(
    values: ProfileDataValues
  ): MethodResponse<AuthContextUser> {
    return axios.put<AuthContextUser>(
      `${UserAPI.USER_PREFIX}${USER_ENDPOINTS.UPDATE_INFO}`,
      values
    );
  }

  @catcher
  static async updateProfilePassword(
    values: ProfilePasswordsValues
  ): MethodResponse<string> {
    return axios.put<string>(
      `${UserAPI.USER_PREFIX}${USER_ENDPOINTS.UPDATE_PASSWORD}`,
      values
    );
  }
}

export default UserAPI;
