import React, { FC, createContext, useState, useEffect } from "react";
import { Chat } from "../@types/chats";
import { AuthUser } from "../@types/auth";

interface ChatContextProps {
  children: Children;
}

interface ChatContextValues {
  activeChat: ChatContextChat;
  setActiveChat: (value: ChatContextChat) => void;

  chatSocket: ChatContextSocket;
  setChatSocket: (value: ChatContextSocket) => void;

  members: ChatContextMember[];
  setMembers: (values: ChatContextMember[]) => void;

  handleChatConnect: ChatConnectCallback;
  handleSendMessage: ChatSendMessageCallback;
  handleLoadOldMessages: ChatLoadMessagesCallback;
  handleChatDisconnect: ChatDisconnectCallback;
}

export type ChatConnectCallback = (chat: ChatContextChat, url: string) => void;

export type ChatSendMessageCallback = (message: string) => void;

export type ChatLoadMessagesCallback = (offset: string) => void;

export type ChatDisconnectCallback = VoidFunction;

export type ChatContextChat = Chat | null;

export type ChatContextSocket = WebSocket | null;

export type ChatContextMember = AuthUser & {
  role: "admin" | "regular";
};

export const ChatContext = createContext<ChatContextValues>(
  {} as ChatContextValues
);

const ChatContextProvider: FC<ChatContextProps> = ({ children }) => {
  const [activeChat, setActiveChat] = useState<ChatContextChat>(null);

  const [chatSocket, setChatSocket] = useState<ChatContextSocket>(null);

  const [members, setMembers] = useState<ChatContextMember[]>([]);

  useEffect(() => {
    if (chatSocket) {
      chatSocket.addEventListener("open", () => {
        console.log("Соединение установлено");

        chatSocket.send(
          JSON.stringify({
            content: "0",
            type: "get old",
          })
        );
      });

      chatSocket.addEventListener("close", (event) => {
        if (event.wasClean) {
          console.log("Соединение закрыто чисто");
        } else {
          console.log("Обрыв соединения");
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        setChatSocket(null);
      });

      chatSocket.addEventListener("message", (event) => {
        console.log("Получены данные: ", event.data);
      });

      chatSocket.addEventListener("error", (event) => {
        console.log("Ошибка", event);
      });
    }
  }, [chatSocket]);

  const handleChatConnect = (chat: ChatContextChat, url: string) => {
    setActiveChat(chat);

    const ws = new WebSocket(url);
    setChatSocket(ws);
  };

  const handleSendMessage = (message: string) => {
    if (chatSocket) {
      chatSocket.send(
        JSON.stringify({
          type: "message",
          content: message,
        })
      );
    }
  };

  const handleLoadOldMessages = (offset = "0") => {
    if (chatSocket) {
      chatSocket.send(JSON.stringify({ type: "get old", content: offset }));
    }
  };

  const handleChatDisconnect = () => {
    setActiveChat(null);
    setChatSocket(null);
    setMembers([]);
  };

  const value = {
    activeChat,
    setActiveChat,
    chatSocket,
    setChatSocket,
    members,
    setMembers,
    handleChatConnect,
    handleSendMessage,
    handleLoadOldMessages,
    handleChatDisconnect,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
