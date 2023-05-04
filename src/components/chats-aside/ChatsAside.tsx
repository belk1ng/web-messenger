import React, { FC, useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import ChatSearch from "../chat-search";
import { DialogList } from "../dialog";
import Scrollbar from "../scrollbar";
import Modal from "../modal";
import CreateChatModalContent from "./CreateChatModalContent";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import ChatsAPI from "../../api/chats";
import { ChatsAsideProps } from "./props";
import { Chat } from "../../@types/chats";

const ChatsAside: FC<ChatsAsideProps> = () => {
  const [chats, setChats] = useState<Chat[]>(Array(15).fill(null));

  const [chatSearchQuery, setChatSearchQuery] = useState("");

  const [modalActive, setModalActive] = useState(false);

  const handleOpenModal = () => {
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const allChats = useRef<Chat[]>([]);

  useEffect(() => {
    handleLoadChats();
  }, []);

  useEffect(() => {
    if (chatSearchQuery.length) {
      setChats(
        allChats.current.filter((chat) =>
          chat.title
            .toLowerCase()
            .includes(chatSearchQuery.trim().toLowerCase())
        )
      );
    } else if (
      (chats.length > 0 && chats[0] !== null) ||
      (allChats.current.length > 0 && chatSearchQuery.trim() === "")
    ) {
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
        <div className={styles.aside__actions}>
          <ChatSearch setSearchQuery={setChatSearchQuery} />
          <button className={styles.aside__create} onClick={handleOpenModal}>
            +
          </button>

          <Modal active={modalActive} setActive={setModalActive}>
            {modalActive && (
              <CreateChatModalContent
                reloadChats={handleLoadChats}
                closeModal={handleCloseModal}
              />
            )}
          </Modal>
        </div>
        {chatSearchQuery.trim().length > 0 &&
          (chats.length ? (
            <p className={styles.aside__results}>
              Found by request <b>&#34;{chatSearchQuery.trim()}&#34;</b>:
            </p>
          ) : (
            <p className={styles.aside__results}>
              No results found for <b>&#34;{chatSearchQuery.trim()}&#34;</b>.
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
