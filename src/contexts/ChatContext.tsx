import React, {
  FC,
  createContext,
  useState,
  useRef,
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
  // Resources
  chat: ActiveChat;
  socket: ChatSocket;
  members: ChatMember[];
  messages: ChatMessage[];

  // Chat managing callbacks
  handleChatConnect: ChatConnectCallback;
  handleSendMessage: ChatSendMessageCallback;
  handleLoadOldMessages: ChatLoadMessagesCallback;
  handleChatDisconnect: ChatDisconnectCallback;

  // Flags
  messagesStopLoading: boolean;
}

export type ChatConnectCallback = (chat: ActiveChat, url: string) => void;

export type ChatSendMessageCallback = (message: string) => void;

export type ChatLoadMessagesCallback = VoidFunction;

export type ChatDisconnectCallback = VoidFunction;

export type ActiveChat = Nullable<Chat>;

export type ChatSocket = Nullable<WebSocketClient>;

export type ChatMember = AuthUser & {
  role: "admin" | "regular";
};

export const ChatContext = createContext<ChatContextValues>(
  {} as ChatContextValues
);

const ChatContextProvider: FC<ChatContextProps> = ({ children }) => {
  const [chat, setChat] = useState<ActiveChat>(null);

  const [socket, setSocket] = useState<ChatSocket>(null);

  const [members, setMembers] = useState<ChatMember[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [messagesStopLoading, setMessagesStopLoading] = useState(false);

  const messagesOffset = useRef(0);

  // Ws manage callbacks

  const handleSendMessage = useCallback(
    (message: string) => {
      socket?.send("message", message);
    },
    [socket]
  );

  const handleLoadOldMessages = useCallback(() => {
    if (!messagesStopLoading) {
      socket?.send("get old", String(messagesOffset.current));
    }

    messagesOffset.current += 20;
  }, [socket]);

  const handleChatDisconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setChat(null);
      setSocket(null);
    }
  }, [socket]);

  const _clearPreviousChatConnection = useCallback(() => {
    setMessages([]);
    setMembers([]);

    setMessagesStopLoading(false);
    messagesOffset.current = 0;
  }, [socket, handleChatDisconnect]);

  const handleChatConnect = useCallback(
    (requestChat: ActiveChat, url: string) => {
      if (chat && chat.id === requestChat?.id) {
        return;
      }

      if (socket) {
        handleChatDisconnect();
      }

      _clearPreviousChatConnection();

      setChat(requestChat);

      const ws = new WebSocketClient().connect(url);
      setSocket(ws);
    },
    [socket, chat, handleChatDisconnect, _clearPreviousChatConnection]
  );

  // Ws event listeners' callbacks

  const _handleSocketOpen = () => {
    console.log("Ws connection established");

    handleLoadOldMessages();
  };

  const _handleSocketClose = (event: CloseEvent) => {
    if (event.wasClean) {
      console.log("Ws connection closed cleanly");
    } else {
      console.log("Lost ws connection");
    }
  };

  const _handleSocketMessage = (event: MessageEvent) => {
    const values = JSON.parse(event.data);

    console.log("Received ws data: ", values);

    const valuesIsArray = Array.isArray(values);

    if (valuesIsArray && values.length > 0) {
      setMessages((prev) => [...prev, ...values]);
    } else if (valuesIsArray) {
      setMessagesStopLoading(true);
    }

    if (values.type === "message") {
      setMessages((prev) => [values, ...prev]);
    }
  };

  const _handleSocketError = (event: Event) => {
    console.log("Ws error: ", event);
  };

  // Configuring new ws connection

  useEffect(() => {
    if (socket) {
      socket.on("open", _handleSocketOpen);
      socket.on("message", _handleSocketMessage as EventListener);
      socket.on("close", _handleSocketClose as EventListener);
      socket.on("error", _handleSocketError);
    }

    return () => {
      if (socket?.socket?.OPEN) {
        handleChatDisconnect();
      }

      _clearPreviousChatConnection();
    };
  }, [socket]);

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

      messagesStopLoading,
    }),
    [chat, socket, members, messages]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
