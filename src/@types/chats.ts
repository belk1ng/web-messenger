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
  avatar: Nullable<string>;
  unread_count: number;

  last_message: Nullable<ChatLastMessage>;
}

export interface ChatMessage {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: "message" | "file";
  content: string;
  is_read?: boolean;
  file?: File;
}

export enum CHATS_ENDPOINTS {
  "CHATS" = "/",
  "ARCHIVE" = "/archive",
  "UNARCHIVE" = "/unarchive",
  "USERS" = "/users",
  "AVATAR" = "/avatar",
}
