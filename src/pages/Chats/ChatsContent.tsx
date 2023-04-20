import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import useTitle from "../../hooks/useTitle";
import { APP_TITLE } from "../../hooks/useTitle";
import ChatsAside from "../../components/chats-aside";
import styles from "./Chats.module.scss";

const ChatsPage = () => {
  useTitle(APP_TITLE.CHATS);

  const { activeChat } = useContext(ChatContext);

  return (
    <main className={styles.chats}>
      <ChatsAside />
      <section className={styles.chats__chat}>
        {activeChat ? (
          <h5 className={styles.chats__trigger}>{activeChat.title}</h5>
        ) : (
          <h5 className={styles.chats__trigger}>
            Select a chat to start messaging
          </h5>
        )}
      </section>
    </main>
  );
};

export default ChatsPage;
