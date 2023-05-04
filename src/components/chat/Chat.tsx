import React, {
  MouseEvent,
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { ChatContext } from "../../contexts/ChatContext";
import useMessages from "../../hooks/useMessages";
import Scrollbar from "../scrollbar/Scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import Messages from "./messages/Messages";
import MessageForm from "./message-form/MessageForm";
import styles from "./Chat.module.scss";
import ChatHeader from "./header/ChatHeader";

const Chat = () => {
  const scrollbarRef = useRef<Scrollbars>(null);

  const chatInitialized = useRef(false);

  const isLoading = useRef(false);

  const { messages, handleLoadOldMessages, stopLoading } = useMessages();

  const {
    chat: activeChat,
    handleChatDisconnect,
    socket,
  } = useContext(ChatContext);

  useLayoutEffect(() => {
    if (scrollbarRef.current) {
      const _scrollTop = scrollbarRef.current.getScrollTop();
      const _clientHeight = scrollbarRef.current.getClientHeight();
      const _scrollHeight = scrollbarRef.current.getScrollHeight();

      const DELTA = 200;

      const isScrollAtBottom =
        _scrollTop + _clientHeight + DELTA > _scrollHeight;

      // Scroll down when opening a chat or when new message received
      if (isScrollAtBottom || !chatInitialized.current) {
        scrollbarRef.current.scrollToBottom();
      }

      // Scroll down to prevent scrollbar being at top
      if (_scrollTop <= 250 && chatInitialized.current) {
        scrollbarRef.current.scrollTop(_clientHeight);
      }
    }

    if (activeChat && messages.length > 0) {
      chatInitialized.current = true;
      isLoading.current = false;
    } else {
      chatInitialized.current = false;
    }
  }, [messages, activeChat]);

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

  const handleScroll = (event: MouseEvent<HTMLDivElement>) => {
    const _target = event.target as Element;

    if (
      _target.scrollTop <= 250 &&
      !isLoading.current &&
      socket?.socket?.readyState &&
      !stopLoading
    ) {
      isLoading.current = true;
      handleLoadOldMessages();
    }
  };

  return (
    <section className={styles.chat}>
      <ChatHeader />
      <div className={styles.chat__content}>
        <Scrollbar ref={scrollbarRef} onScroll={handleScroll}>
          <Messages messages={messages} />
        </Scrollbar>
      </div>
      <div className={styles.chat__footer}>
        <MessageForm />
      </div>
    </section>
  );
};

export default Chat;
