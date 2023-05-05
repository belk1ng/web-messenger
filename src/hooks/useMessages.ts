import {
  useState,
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useCallback,
  MouseEvent,
} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { ChatContext } from "../contexts/ChatContext";
import { ChatMessage } from "../@types/chats";

export enum ChatMessagesBusEvents {
  "MESSAGES" = "receive-messages",
  "MESSAGE" = "receive-message",
  "AUTO_LOAD" = "receive-more",
  "NO_MORE_MESSAGES" = "no-more-messages",
  "RESET" = "reset",
}

const useMessages = (scrollbarRef: Scrollbars | null) => {
  const { eventBus, socket, chat, handleChatDisconnect } =
    useContext(ChatContext);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [noMoreMessages, setNoMoreMessages] = useState(false);

  const messagesOffset = useRef(0);

  const chatInitialized = useRef(false);

  const isLoading = useRef(false);

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

  useLayoutEffect(() => {
    if (scrollbarRef) {
      const _scrollTop = scrollbarRef.getScrollTop();
      const _clientHeight = scrollbarRef.getClientHeight();
      const _scrollHeight = scrollbarRef.getScrollHeight();

      const delta = 200;

      const isScrollAtBottom =
        _scrollTop + _clientHeight + delta > _scrollHeight;

      // Scroll down when opening a chat or when new message received
      if (isScrollAtBottom || !chatInitialized.current) {
        scrollbarRef.scrollToBottom();
      }

      // Scroll down to prevent scrollbar being at top
      if (_scrollTop <= 250 && chatInitialized.current) {
        scrollbarRef.scrollTop(_clientHeight);
      }
    }

    if (chat && messages.length > 0) {
      chatInitialized.current = true;
      isLoading.current = false;
    } else {
      chatInitialized.current = false;
    }
  }, [messages, chat]);

  useEffect(() => {
    const _handlePressEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleChatDisconnect();
      }
    };

    document.addEventListener("keydown", _handlePressEscape);

    return () => {
      document.removeEventListener("keydown", _handlePressEscape);
    };
  }, [handleChatDisconnect]);

  const handleLoadOldMessages = () => {
    if (!noMoreMessages) {
      socket?.send("get old", String(messagesOffset.current));
    }

    messagesOffset.current += 20;
  };

  const handleNoMoreMessages = () => {
    setNoMoreMessages(true);
  };

  const handleReset = () => {
    setMessages([]);
    setNoMoreMessages(false);
    messagesOffset.current = 0;
  };

  const handleScroll = (event: MouseEvent<HTMLDivElement>) => {
    const _target = event.target as Element;

    if (
      _target.scrollTop <= 250 &&
      !isLoading.current &&
      socket?.socket?.readyState &&
      !noMoreMessages
    ) {
      isLoading.current = true;
      handleLoadOldMessages();
    }
  };

  return {
    messages,
    handleScroll,
  };
};

export default useMessages;
