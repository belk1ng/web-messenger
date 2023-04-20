import React, { FC, useRef, useContext, useEffect } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import Scrollbar from "../scrollbar/Scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import Messages from "./messages/Messages";
import MessageForm from "./message-form/MessageForm";
import { ChatProps } from "./props";
import styles from "./Chat.module.scss";

const Chat: FC<ChatProps> = ({ chat }) => {
  const scrollbarRef = useRef<Scrollbars>(null);

  const { messages, activeChat } = useContext(ChatContext);

  useEffect(() => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollToBottom();
    }
  }, [messages, activeChat]);

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
        <div className={styles.chat__actions}></div>
      </div>
      <div className={styles.chat__content}>
        <Scrollbar ref={scrollbarRef}>
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
