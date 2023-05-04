import axios from "./axios";
import catcher from "./catcher";
import { MethodResponse } from "../@types/api";
import { CHATS_ENDPOINTS, Chat } from "../@types/chats";

class ChatsAPI {
  private static CHATS_PREFIX = "/chats";

  @catcher
  static async getChats(title?: string): MethodResponse<Chat[]> {
    const params = new URLSearchParams();

    if (title) {
      params.append("title", title);
    }

    return axios.get<Chat[]>(
      `${ChatsAPI.CHATS_PREFIX}${CHATS_ENDPOINTS.CHATS}`,
      { params }
    );
  }

  @catcher
  static async getToken(id: number): MethodResponse<{ token: string }> {
    return axios.post<{ token: string }>(
      `${ChatsAPI.CHATS_PREFIX}/token/${id}`
    );
  }

  @catcher
  static async createChat(title: string): MethodResponse<string> {
    return axios.post<string>(
      `${ChatsAPI.CHATS_PREFIX}${CHATS_ENDPOINTS.CHATS}`,
      { title }
    );
  }
}

export default ChatsAPI;
