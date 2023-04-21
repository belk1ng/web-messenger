import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import useTitle from "../../hooks/useTitle";
import { APP_TITLE } from "../../hooks/useTitle";
import ChatsAside from "../../components/chats-aside";
import styles from "./Chats.module.scss";
import Chat from "../../components/chat/Chat";

const ChatsPage = () => {
  useTitle(APP_TITLE.CHATS);

  const { chat } = useContext(ChatContext);

  return (
    <main className={styles.chats}>
      <ChatsAside />

      <section className={styles.chats__chat}>
        {chat ? (
          <Chat chat={chat} />
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
