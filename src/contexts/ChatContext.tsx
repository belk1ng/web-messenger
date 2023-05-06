import React, {
  FC,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Chat } from "../@types/chats";
import { ChatMessagesBusEvents } from "../hooks/useMessages";

import EventBus from "../utils/eventBus/eventBus";
import WebSocketClient from "../utils/websocket";

interface ChatContextProps {
  children: Children;
}

interface ChatContextValues {
  // Resources
  chat: ActiveChat;
  socket: ChatSocket;

  // Chat managing callbacks
  handleChatConnect: ChatConnectCallback;
  handleSendMessage: ChatSendMessageCallback;
  handleChatDisconnect: ChatDisconnectCallback;

  // Bus
  eventBus: Nullable<EventBus>;
}

export type ChatConnectCallback = (chat: ActiveChat, url: string) => void;

export type ChatSendMessageCallback = (message: string) => void;

export type ChatLoadMessagesCallback = VoidFunction;

export type ChatDisconnectCallback = VoidFunction;

export type ActiveChat = Nullable<Chat>;

export type ChatSocket = Nullable<WebSocketClient>;

export const ChatContext = createContext<ChatContextValues>(
  {} as ChatContextValues
);

const ChatContextProvider: FC<ChatContextProps> = ({ children }) => {
  const [chat, setChat] = useState<ActiveChat>(null);

  const [socket, setSocket] = useState<ChatSocket>(null);

  const eventBus = useMemo(() => (socket ? new EventBus() : null), [socket]);

  // Ws manage callbacks

  const handleSendMessage = useCallback(
    (message: string) => {
      socket?.send("message", message);
    },
    [socket]
  );

  const handleChatDisconnect = useCallback(() => {
    if (socket) {
      eventBus?.emit(ChatMessagesBusEvents.RESET);

      socket.disconnect();
      setChat(null);
      setSocket(null);
    }
  }, [socket]);

  const handleChatConnect = useCallback(
    (requestChat: ActiveChat, url: string) => {
      if (chat && chat.id === requestChat?.id) {
        return;
      }

      if (socket) {
        handleChatDisconnect();
      }

      setChat(requestChat);

      const ws = new WebSocketClient().connect(url);
      setSocket(ws);
    },
    [socket, chat, handleChatDisconnect]
  );

  // Ws event listeners' callbacks

  const _handleSocketOpen = () => {
    console.log("Ws connection established");

    eventBus?.emit(ChatMessagesBusEvents.AUTO_LOAD);
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
      eventBus?.emit(ChatMessagesBusEvents.MESSAGES, values);
    } else if (valuesIsArray) {
      eventBus?.emit(ChatMessagesBusEvents.NO_MORE_MESSAGES);
    }

    if (values.type === "message") {
      eventBus?.emit(ChatMessagesBusEvents.MESSAGE, values);
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
    };
  }, [socket]);

  const value = useMemo(
    () => ({
      chat,
      socket,

      handleChatConnect,
      handleSendMessage,
      handleChatDisconnect,

      eventBus,
    }),
    [chat, socket]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
