import { Chat } from "../../@types/chats";
import { ChatConnectCallback } from "../../contexts/ChatContext";

type WithConnect = {
  handleChatConnect: ChatConnectCallback;
};

export type DialogProps = {
  dialog: Chat;
} & WithConnect;

export type DialogListProps = {
  list: Chat[];
} & WithConnect;
