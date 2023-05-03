import React, { FC, useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import ChatSearch from "../chat-search";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import { DialogList } from "../dialog";
import Scrollbar from "../scrollbar";
import ChatsAPI from "../../api/chats";
import { ChatsAsideProps } from "./props";
import { Chat } from "../../@types/chats";

const ChatsAside: FC<ChatsAsideProps> = () => {
  const [chats, setChats] = useState<Chat[]>(Array(15).fill(null));

  const [chatSearchQuery, setChatSearchQuery] = useState("");

  const allChats = useRef<Chat[]>([]);

  useEffect(() => {
    handleLoadChats();
  }, []);

  useEffect(() => {
    if (chatSearchQuery.length) {
      setChats(
        allChats.current.filter((chat) =>
          chat.title.toLowerCase().includes(chatSearchQuery.toLowerCase())
        )
      );
    } else if (chats.length > 0 && chats[0] !== null) {
      setChats(allChats.current);
    }
  }, [chatSearchQuery]);

  const handleLoadChats = async () => {
    const response = await ChatsAPI.getChats();

    if (
      response?.data &&
      typeof response.data === "object" &&
      response.status === 200 &&
      !("reason" in response.data)
    ) {
      setChats(response.data);
      allChats.current = response.data;
    } else {
      console.log("Error: ", response?.data);
    }
  };

  return (
    <aside className={styles.aside}>
      <section className={styles.aside__header}>
        <Link to={APP_ROUTES.PROFILE} className={styles.aside__link}>
          Profile
          <svg
            className={styles.aside__vector}
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 9L5 5L1 1" stroke="#999999" />
          </svg>
        </Link>
        <ChatSearch setSearchQuery={setChatSearchQuery} />
        {chatSearchQuery.length > 0 &&
          (chats.length ? (
            <p className={styles.aside__results}>
              Результаты по запросу <b>&#34;{chatSearchQuery}&#34;</b>:
            </p>
          ) : (
            <p className={styles.aside__results}>
              По запросу <b>&#34;{chatSearchQuery}&#34;</b> ничего не найдено.
            </p>
          ))}
      </section>
      <section className={styles.aside__list}>
        <Scrollbar>
          <DialogList list={chats} />
        </Scrollbar>
      </section>
    </aside>
  );
};

export default memo(ChatsAside);
