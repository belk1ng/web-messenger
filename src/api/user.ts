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
    const response = await axios.put<AuthContextUser>(
      `${UserAPI.USER_PREFIX}${USER_ENDPOINTS.AVATAR}`,
      values
    );
    const { data, status } = response;

    return { data, status };
  }

  @catcher
  static async updateProfileData(
    values: ProfileDataValues
  ): MethodResponse<AuthContextUser> {
    const response = await axios.put<AuthContextUser>(
      `${UserAPI.USER_PREFIX}${USER_ENDPOINTS.UPDATE_INFO}`,
      values
    );
    const { data, status } = response;

    return { data, status };
  }

  @catcher
  static async updateProfilePassword(
    values: ProfilePasswordsValues
  ): MethodResponse<string> {
    const response = await axios.put<string>(
      `${UserAPI.USER_PREFIX}${USER_ENDPOINTS.UPDATE_PASSWORD}`,
      values
    );
    const { data, status } = response;

    return { data, status };
  }
}

export default UserAPI;
