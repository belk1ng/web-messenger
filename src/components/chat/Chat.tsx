import React, { useRef } from "react";
import useMessages from "../../hooks/useMessages";
import Scrollbar from "../scrollbar/Scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import Messages from "./messages/Messages";
import MessageForm from "./message-form/MessageForm";
import styles from "./Chat.module.scss";
import ChatHeader from "./header/ChatHeader";

const Chat = () => {
  const scrollbarRef = useRef<Scrollbars>(null);

  const { messages, handleScroll } = useMessages(scrollbarRef.current);

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
