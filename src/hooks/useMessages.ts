import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { ChatMessage } from "../@types/chats";

export enum ChatMessagesBusEvents {
  "MESSAGES" = "receive-messages",
  "MESSAGE" = "receive-message",
  "AUTO_LOAD" = "receive-more",
  "NO_MORE_MESSAGES" = "no-more-messages",
  "RESET" = "reset",
}

const useMessages = () => {
  const { eventBus, socket } = useContext(ChatContext);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [stopLoading, setStopLoading] = useState(false);

  const messagesOffset = useRef(0);

  const handleLoadOldMessages = () => {
    if (!stopLoading) {
      socket?.send("get old", String(messagesOffset.current));
    }

    messagesOffset.current += 20;
  };

  const handleNoMoreMessages = () => {
    setStopLoading(true);
  };

  const handleReset = () => {
    setMessages([]);
    setStopLoading(false);
    messagesOffset.current = 0;
  };

  const _initEventBus = useCallback(() => {
    if (eventBus) {
      eventBus.on(ChatMessagesBusEvents.MESSAGES, (messages) => {
        setMessages((prev) => [...prev, ...(messages as ChatMessage[])]);
      });

      eventBus.on(ChatMessagesBusEvents.MESSAGE, (message) => {
        setMessages((prev) => [message as ChatMessage, ...prev]);
      });

      eventBus.on(ChatMessagesBusEvents.NO_MORE_MESSAGES, handleNoMoreMessages);

      eventBus.on(ChatMessagesBusEvents.AUTO_LOAD, handleLoadOldMessages);

      eventBus.on(ChatMessagesBusEvents.RESET, handleReset);
    }
  }, [eventBus]);

  useEffect(() => {
    _initEventBus();

    return () => {
      if (eventBus) {
        eventBus.reset();
      }
    };
  }, [_initEventBus]);

  return {
    messages,
    stopLoading,
    messagesOffset: messagesOffset.current,

    handleLoadOldMessages,
  };
};

export default useMessages;
