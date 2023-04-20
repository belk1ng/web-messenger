import React, { FC, useState, useEffect, useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { Link } from "react-router-dom";
import UserSearch from "../user-search";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import { DialogList } from "../dialog";
import Scrollbar from "../scrollbar";
import ChatsAPI from "../../api/chats";
import { ChatsAsideProps } from "./props";
import { Chat } from "../../@types/chats";

const ChatsAside: FC<ChatsAsideProps> = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const { handleChatConnect } = useContext(ChatContext);

  const handleLoadChats = async () => {
    const response = await ChatsAPI.getChats();

    if (
      response?.data &&
      typeof response.data === "object" &&
      response.status === 200 &&
      !("reason" in response.data)
    ) {
      setChats(response.data);
    } else {
      console.log("Error: ", response?.data);
    }
  };

  useEffect(() => {
    handleLoadChats();
  }, []);

  return (
    <aside className={styles.aside}>
      <section className={styles.aside__header}>
        <Link to={APP_ROUTES.PROFILE} className={styles.aside__link}>
          Profile
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 9L5 5L1 1" stroke="#999999" />
          </svg>
        </Link>
        <UserSearch />
      </section>
      <section className={styles.aside__list}>
        <Scrollbar>
          <DialogList list={chats} handleChatConnect={handleChatConnect} />
        </Scrollbar>
      </section>
    </aside>
  );
};

export default ChatsAside;
