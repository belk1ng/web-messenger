import React, {
  FC,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Chat, ChatMessage } from "../@types/chats";
import { AuthUser } from "../@types/auth";

import WebSocketClient from "../utils/websocket";

interface ChatContextProps {
  children: Children;
}

interface ChatContextValues {
  chat: ChatContextChat;
  socket: ChatContextSocket;
  members: ChatContextMember[];
  messages: ChatMessage[];

  setActiveChat: (value: ChatContextChat) => void;

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

export type ChatContextSocket = WebSocketClient | null;

export type ChatContextMember = AuthUser & {
  role: "admin" | "regular";
};

export const ChatContext = createContext<ChatContextValues>(
  {} as ChatContextValues
);

const ChatContextProvider: FC<ChatContextProps> = ({ children }) => {
  const [activeChat, setActiveChat] = useState<ChatContextChat>(null);

  const [chatSocket, setChatSocket] = useState<ChatContextSocket>(null);

  const [chatMembers, setChatMembers] = useState<ChatContextMember[]>([]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const chat = useMemo(() => activeChat, [activeChat]);

  const socket = useMemo(() => chatSocket, [chatSocket]);

  const members = useMemo(() => chatMembers, [chatMembers]);

  const messages = useMemo(() => chatMessages, [chatMessages]);

  const handleSendMessage = useCallback(
    (message: string) => {
      chatSocket?.send("message", message);
    },
    [chatSocket]
  );

  const handleLoadOldMessages = useCallback(
    (offset: number) => {
      chatSocket?.send("get old", String(offset));
    },
    [chatSocket]
  );

  const handleChatDisconnect = useCallback(() => {
    if (chatSocket) {
      chatSocket.disconnect();
    }
  }, [chatSocket]);

  const handleChatConnect = useCallback(
    (chat: ChatContextChat, url: string) => {
      if (activeChat && activeChat.id === chat?.id) {
        return;
      }

      setChatMessages([]);
      setChatMembers([]);

      if (chatSocket) {
        handleChatDisconnect();
      }

      setActiveChat(chat);

      const ws = new WebSocketClient().connect(url);
      setChatSocket(ws);
    },
    [chatSocket, handleChatDisconnect]
  );

  const _handleSocketOpen = () => {
    console.log("Ws connection established");
    handleLoadOldMessages(0);
  };

  const _handleSocketClose = (event: CloseEvent) => {
    if (event.wasClean) {
      console.log("Ws connection closed cleanly");
    } else {
      console.log("Lost ws connection");
    }

    setChatSocket(null);
  };

  const _handleSocketMessage = (event: MessageEvent) => {
    const values = JSON.parse(event.data);

    console.log("Received ws data: ", values);

    if (Array.isArray(values)) {
      setChatMessages((prev) => [...values, ...prev]);
    }

    if (values.type === "message") {
      setChatMessages((prev) => [values, ...prev]);
    }
  };

  const _handleSocketError = (event: Event) => {
    console.log("Ws error: ", event);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (chatSocket) {
      chatSocket.on("open", _handleSocketOpen);
      chatSocket.on("message", _handleSocketMessage as EventListener);
      chatSocket.on("close", _handleSocketClose as EventListener);
      chatSocket.on("error", _handleSocketError);
    }

    return () => {
      clearInterval(interval);
    };
  }, [chatSocket]);

  const value = useMemo(
    () => ({
      chat,
      socket,
      members,
      messages,

      handleChatConnect,
      handleSendMessage,
      handleLoadOldMessages,
      handleChatDisconnect,

      setActiveChat,
    }),
    [activeChat, chatSocket, members, messages]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;