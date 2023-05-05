import React, { FC, useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import ChatSearch from "../chat-search";
import { DialogList } from "../dialog";
import Scrollbar from "../scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import Modal from "../modal";
import CreateChatModalContent from "./CreateChatModalContent";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import ChatsAPI from "../../api/chats";
import { ChatsAsideProps } from "./props";
import { Chat } from "../../@types/chats";

const ChatsAside: FC<ChatsAsideProps> = () => {
  const [chats, setChats] = useState<Chat[]>(Array(15).fill(null));

  const [chatsOffset, setChatsOffset] = useState(0);

  const [chatsAutoLoading, setChatsAutoLoading] = useState<boolean | null>(
    false
  );

  const [chatSearchQuery, setChatSearchQuery] = useState("");

  const [modalActive, setModalActive] = useState(false);

  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    setChats(Array(15).fill(null));

    const controller = new AbortController();
    const searchQuery = chatSearchQuery.trim();

    scrollbarRef?.current?.scrollToTop();

    setChatsOffset(0);
    handleLoadChats(0, searchQuery, false, controller);

    return () => {
      controller.abort();
    };
  }, [chatSearchQuery]);

  useEffect(() => {
    if (chatsAutoLoading) {
      handleLoadChats(chatsOffset, chatSearchQuery, true);
    }
  }, [chatsAutoLoading, chatsOffset]);

  const handleLoadChats = async (
    offset = 0,
    query = "",
    scrolling = false,
    controller?: AbortController
  ) => {
    const response = await ChatsAPI.getChats(offset, query, controller);

    if (
      response?.data &&
      typeof response.data === "object" &&
      response.status === 200 &&
      !("reason" in response.data)
    ) {
      const responseChats = response.data;

      if (scrolling) {
        setChats((prev) => [...prev, ...responseChats]);
      } else {
        setChats(response.data);
      }

      setChatsAutoLoading(
        responseChats.length < ChatsAPI.CHATS_LIMIT ? null : false
      );

      setChatsOffset((prev) => prev + ChatsAPI.CHATS_LIMIT);
    } else {
      console.log("Error: ", response?.data);
      setChatsAutoLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollbar = scrollbarRef.current;

    if (scrollbar) {
      const clientHeight = scrollbar.getClientHeight();
      const scrollTop = scrollbar.getScrollTop();
      const scrollHeight = scrollbar.getScrollHeight();
      const delta = 100;

      if (
        clientHeight + scrollTop + delta >= scrollHeight &&
        !chatsAutoLoading &&
        chatsAutoLoading !== null
      ) {
        setChatsAutoLoading(true);
      }
    }
  };

  const handleOpenModal = () => {
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
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
          chats[0] !== null &&
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
        <Scrollbar ref={scrollbarRef} onScroll={handleScroll}>
          <DialogList list={chats} />
        </Scrollbar>
      </section>
    </aside>
  );
};

export default memo(ChatsAside);
