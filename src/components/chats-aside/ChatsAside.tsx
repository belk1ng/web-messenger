import React, { FC, useState, useRef, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import ChatSearch from "../chat-search";
import { DialogList } from "../dialog";
import Scrollbar from "../scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import Modal from "../modal";
import CreateChatModalContent from "./CreateChatModalContent";
import Loader from "../loader";
import ChevronRight from "../../assets/icons/ChevronRight";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import useChats from "../../hooks/useChats";
import { ChatsAsideProps } from "./props";

const ChatsAside: FC<ChatsAsideProps> = () => {
  const [modalActive, setModalActive] = useState(false);

  const scrollbarRef = useRef<Nullable<Scrollbars>>(null);

  const {
    chats,
    chatSearchQuery,
    setChatSearchQuery,
    handleScroll,
    chatsAutoLoading,
    reloadChats,
  } = useChats(scrollbarRef?.current);

  const searchHint = useMemo(() => {
    const queryTrimmed = chatSearchQuery.trim();

    const hintContent = (
      <>
        {chats.length ? "Found by request" : "No results found for"}
        <b>{` "${queryTrimmed}"`}</b>
        {chats.length ? ":" : "."}
      </>
    );

    return (
      queryTrimmed &&
      chats[0] !== null && (
        <p className={styles.aside__results}>{hintContent}</p>
      )
    );
  }, [chatSearchQuery, chats]);

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
          <ChevronRight />
        </Link>
        <div className={styles.aside__actions}>
          <ChatSearch setSearchQuery={setChatSearchQuery} />
          <button className={styles.aside__create} onClick={handleOpenModal}>
            +
          </button>

          <Modal
            title="Create chat"
            active={modalActive}
            setActive={setModalActive}
          >
            <CreateChatModalContent
              reloadChats={reloadChats}
              closeModal={handleCloseModal}
            />
          </Modal>
        </div>
        {searchHint}
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
