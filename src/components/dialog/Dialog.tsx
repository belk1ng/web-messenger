import React, { FC, useContext, memo } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import useAuth from "../../hooks/useAuth";
import styles from "./Dialog.module.scss";
import classnames from "classnames";
import { DialogProps } from "./props";
import timeAgo from "../../utils/timeAgo";
import ChatsAPI from "../../api/chats";

const Dialog: FC<DialogProps> = ({ dialog }) => {
  const { user } = useAuth();

  const { handleChatConnect, chat } = useContext(ChatContext);

  const { id, avatar, title, last_message, unread_count } = dialog;

  const handleDialogClick = async () => {
    if (user) {
      const response = await ChatsAPI.getToken(id);

      if (
        response?.data &&
        response.status === 200 &&
        typeof response.data === "object" &&
        !("reason" in response.data)
      ) {
        const url = `wss://ya-praktikum.tech/ws/chats/${user.id}/${id}/${response.data.token}`;

        handleChatConnect(dialog, url);
      }
    }
  };

  return (
    <div
      className={classnames(
        styles.dialog,
        chat?.id === id && styles["dialog--active"]
      )}
      onClick={handleDialogClick}
    >
      <img
        className={styles.dialog__avatar}
        alt="chat-avatar"
        src={avatar ? avatar : "https://vk.com/images/camera_200.png"}
      />
      <div className={styles.dialog__info}>
        <div className={styles.dialog__top}>
          <p className={styles.dialog__title}>{title}</p>
          {last_message?.time && (
            <p className={styles.dialog__date}>{timeAgo(last_message?.time)}</p>
          )}
        </div>
        <div className={styles.dialog__bottom}>
          <p className={styles.dialog__message}>
            <span className={styles.dialog__sender}>
              {user?.login === last_message?.user?.login
                ? "You: "
                : `${last_message?.user?.first_name} ${last_message?.user?.second_name}: `}
            </span>
            {last_message?.content}
          </p>
          {unread_count ? (
            <p className={styles.dialog__unread}>
              {unread_count <= 99 ? unread_count : "99+"}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(Dialog);
