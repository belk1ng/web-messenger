import React, { FC, useState, useRef, memo } from "react";
import { Link } from "react-router-dom";
import ChatSearch from "../chat-search";
import { DialogList } from "../dialog";
import Scrollbar from "../scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import Modal from "../modal";
import CreateChatModalContent from "./CreateChatModalContent";
import Loader from "../loader/Loader";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import useChats from "../../hooks/useChats";
import { ChatsAsideProps } from "./props";

const ChatsAside: FC<ChatsAsideProps> = () => {
  const [modalActive, setModalActive] = useState(false);

  const scrollbarRef = useRef<Scrollbars>(null);

  const {
    chats,
    chatSearchQuery,
    setChatSearchQuery,
    handleScroll,
    handleLoadChats,
    chatsAutoLoading,
  } = useChats(scrollbarRef?.current);

  const queryTrimed = chatSearchQuery.trim();

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
        {queryTrimed.length > 0 &&
          chats[0] !== null &&
          (chats.length ? (
            <p className={styles.aside__results}>
              Found by request <b>&#34;{queryTrimed}&#34;</b>:
            </p>
          ) : (
            <p className={styles.aside__results}>
              No results found for <b>&#34;{queryTrimed}&#34;</b>.
            </p>
          ))}
      </section>
      <section className={styles.aside__list}>
        <Scrollbar ref={scrollbarRef} onScroll={handleScroll}>
          <DialogList list={chats} />
          {chatsAutoLoading && (
            <div className={styles.aside__loader}>
              <Loader fullScreen={false} />
            </div>
          )}
        </Scrollbar>
      </section>
    </aside>
  );
};

export default memo(ChatsAside);
