import React, { FC, createContext, useState, useEffect } from "react";
import { Chat, ChatMessage } from "../@types/chats";
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

  messages: ChatMessage[];

  handleChatConnect: ChatConnectCallback;
  handleSendMessage: ChatSendMessageCallback;
  handleLoadOldMessages: ChatLoadMessagesCallback;
  handleChatDisconnect: ChatDisconnectCallback;
}

export type ChatConnectCallback = (chat: ChatContextChat, url: string) => void;

export type ChatSendMessageCallback = (message: string) => void;

export type ChatLoadMessagesCallback = (offset: number) => void;

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

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const socketSend = (
    type: "message" | "get old" | "ping",
    content?: string
  ) => {
    if (chatSocket && type !== "ping") {
      chatSocket.send(
        JSON.stringify({
          type,
          content,
        })
      );
    } else if (chatSocket) {
      chatSocket.send(JSON.stringify({ type }));
    }
  };

  const handleSendMessage = (message: string) => {
    socketSend("message", message);
  };

  const handleLoadOldMessages = (offset: number) => {
    socketSend("get old", String(offset));
  };

  const handleChatConnect = (chat: ChatContextChat, url: string) => {
    if (chatSocket) {
      chatSocket.close();
    }

    setActiveChat(chat);

    const ws = new WebSocket(url);
    setChatSocket(ws);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (chatSocket) {
      chatSocket.addEventListener("open", () => {
        console.log("Соединение установлено");

        handleLoadOldMessages(0);
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

      chatSocket.addEventListener("message", (event: MessageEvent<string>) => {
        const socketData = JSON.parse(event.data);

        console.log("Получены данные: ", socketData);

        if (Array.isArray(socketData)) {
          setMessages((prev) => [...socketData, ...prev]);
        }

        if (socketData.type === "message") {
          setMessages((prev) => [socketData, ...prev]);
        }
      });

      chatSocket.addEventListener("error", (event) => {
        console.log("Ошибка", event);
      });

      interval = setInterval(() => {
        socketSend("ping");
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [chatSocket]);

  useEffect(() => {
    if (!activeChat) {
      setMembers([]);
      setActiveChat(null);
    }
  }, [chatSocket]);

  useEffect(() => {
    setMessages([]);
  }, [activeChat]);

  const handleChatDisconnect = () => {
    setActiveChat(null);
  };

  const value = {
    activeChat,
    setActiveChat,
    chatSocket,
    setChatSocket,
    members,
    messages,
    handleChatConnect,
    handleSendMessage,
    handleLoadOldMessages,
    handleChatDisconnect,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
