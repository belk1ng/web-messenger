import axios from "./axios";
import catcher from "./catcher";
import { MethodResponse } from "../@types/api";
import { CHATS_ENDPOINTS, Chat } from "../@types/chats";

class ChatsAPI {
  private static CHATS_PREFIX = "/chats";

  @catcher
  static async getChats(): MethodResponse<Chat[]> {
    return axios.get<Chat[]>(
      `${ChatsAPI.CHATS_PREFIX}${CHATS_ENDPOINTS.CHATS}`
    );
  }

  @catcher
  static async getToken(id: number): MethodResponse<{ token: string }> {
    return axios.post<{ token: string }>(
      `${ChatsAPI.CHATS_PREFIX}/token/${id}`
    );
  }
}

export default ChatsAPI;
