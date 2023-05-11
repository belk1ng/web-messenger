import React, { FC, useContext, useRef, useMemo, memo } from "react";
import { ModalType, ModalsContext } from "../../contexts/ModalsContext";
import { Link } from "react-router-dom";
import ChatSearch from "../chat-search";
import { DialogList } from "../dialog";
import Scrollbar from "../scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import CreateChatModal from "../modals/CreateChatModal";
import Loader from "../loader";
import ChevronRight from "../../assets/icons/ChevronRight";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import useChats from "../../hooks/useChats";
import { ChatsAsideProps } from "./props";

const ChatsAside: FC<ChatsAsideProps> = () => {
  const scrollbarRef = useRef<Nullable<Scrollbars>>(null);

  const { handleOpenModal } = useContext(ModalsContext);

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

  const _handleOpenModal = () => {
    handleOpenModal(ModalType.CREATE_CHAT);
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
          <button className={styles.aside__create} onClick={_handleOpenModal}>
            +
          </button>

          <CreateChatModal reloadChats={reloadChats} />
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
