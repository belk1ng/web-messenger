import axios from "./axios";
import catcher from "./catcher";
import { MethodResponse } from "../@types/api";
import { CHATS_ENDPOINTS, Chat } from "../@types/chats";

class ChatsAPI {
  private static CHATS_PREFIX = "/chats";

  @catcher
  static async getChats(): MethodResponse<Chat[]> {
    const response = await axios.get<Chat[]>(
      `${ChatsAPI.CHATS_PREFIX}${CHATS_ENDPOINTS.CHATS}`
    );
    const { data, status } = response;

    return { data, status };
  }

  @catcher
  static async getToken(id: number): MethodResponse<{ token: string }> {
    const response = await axios.post<{ token: string }>(
      `${ChatsAPI.CHATS_PREFIX}/token/${id}`
    );
    const { data, status } = response;

    return { data, status };
  }
}

export default ChatsAPI;
