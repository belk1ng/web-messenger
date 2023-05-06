import axios from "./axios";
import catcher from "./catcher";
import { MethodResponse } from "../@types/api";
import { CHATS_ENDPOINTS, Chat } from "../@types/chats";

class ChatsAPI {
  private static CHATS_PREFIX = "/chats";
  public static CHATS_LIMIT = 20;

  @catcher
  static async getChats(
    offset: number,
    title = "",
    controller?: AbortController
  ): MethodResponse<Chat[]> {
    const params = new URLSearchParams();

    if (title) {
      params.append("title", title);
    }

    params.append("limit", String(ChatsAPI.CHATS_LIMIT));
    params.append("offset", String(offset));

    return axios.get<Chat[]>(
      `${ChatsAPI.CHATS_PREFIX}${CHATS_ENDPOINTS.CHATS}`,
      { params, signal: controller?.signal }
    );
  }

  @catcher
  static async getToken(id: number): MethodResponse<{ token: string }> {
    return axios.post<{ token: string }>(
      `${ChatsAPI.CHATS_PREFIX}/token/${id}`
    );
  }

  @catcher
  static async createChat(title: string): MethodResponse {
    return axios.post<string>(
      `${ChatsAPI.CHATS_PREFIX}${CHATS_ENDPOINTS.CHATS}`,
      { title }
    );
  }
}

export default ChatsAPI;
