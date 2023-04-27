import React, { FC, MouseEvent, useRef, useContext, useEffect } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import Dropdown from "../dropdown";
import DropdownItem from "../dropdown-item";
import Scrollbar from "../scrollbar/Scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import Messages from "./messages/Messages";
import MessageForm from "./message-form/MessageForm";
import { ChatProps } from "./props";
import styles from "./Chat.module.scss";

const Chat: FC<ChatProps> = ({ chat }) => {
  const scrollbarRef = useRef<Scrollbars>(null);

  const chatInitialized = useRef(false);

  const isLoading = useRef(false);

  const {
    messages,
    chat: activeChat,
    handleLoadOldMessages,
    messagesStopLoading,
    handleChatDisconnect,
    socket,
  } = useContext(ChatContext);

  useEffect(() => {
    if (scrollbarRef.current) {
      const _scrollTop = scrollbarRef.current.getScrollTop();
      const _clientHeight = scrollbarRef.current.getClientHeight();
      const _scrollHeight = scrollbarRef.current.getScrollHeight();

      const DELTA = 120;

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
      !messagesStopLoading
    ) {
      isLoading.current = true;
      handleLoadOldMessages();
    }
  };

  return (
    <section className={styles.chat}>
      <div className={styles.chat__header}>
        <div className={styles.chat__info}>
          <img
            className={styles.chat__avatar}
            alt="Chat avatar"
            src="https://images.unsplash.com/photo-1681846291878-1103198eb2d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <h3 className={styles.chat__title}>{chat.title}</h3>
        </div>
        <div className={styles.chat__actions}>
          <Dropdown>
            <DropdownItem
              text="Add user"
              callback={() => console.log("add user")}
            />
            <DropdownItem
              modifier="danger"
              text="Remove user"
              callback={() => console.log("remove user")}
            />
          </Dropdown>
        </div>
      </div>
      <div className={styles.chat__content}>
        <Scrollbar ref={scrollbarRef} onScroll={handleScroll}>
          <Messages />
        </Scrollbar>
      </div>
      <div className={styles.chat__footer}>
        <MessageForm />
      </div>
    </section>
  );
};

export default Chat;
