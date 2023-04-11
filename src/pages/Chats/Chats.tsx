import React from "react";
import useTitle from "../../hooks/useTitle";
import { APP_TITLE } from "../../hooks/useTitle";
import ChatsAside from "../../components/chats-aside";
import styles from "./Chats.module.scss";

const ChatsPage = () => {
  useTitle(APP_TITLE.CHATS);

  return (
    <main className={styles.chats}>
      <ChatsAside />
      <section className={styles.chats__chat}>
        <h5 className={styles.chats__trigger}>
          Сhoose who you would like to write to
        </h5>
      </section>
    </main>
  );
};

export default ChatsPage;
