import { User } from "./auth";

type LastMessageUser = Omit<User, "id" | "password" | "display_name">;

interface ChatLastMessage {
  user: LastMessageUser;
  time: string;
  content: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;

  last_message: ChatLastMessage | null;
}

export enum CHATS_ENDPOINTS {
  "CHATS" = "/",
  "ARCHIVE" = "/archieve",
  "UNARCHIVE" = "/unarchieve",
  "USERS" = "/users",
  "AVATAR" = "/avatar",
}
