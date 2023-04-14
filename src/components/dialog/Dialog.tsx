import React, { FC } from "react";
import { DialogProps } from "./props";
import styles from "./Dialog.module.scss";
import timeAgo from "../../utils/timeAgo";

const Dialog: FC<DialogProps> = ({ avatar, title, message, unread }) => {
  return (
    <div className={styles.dialog}>
      <div className={styles.dialog__left}>
        <img
          className={styles.dialog__avatar}
          alt="chat-avatar"
          src={avatar ? avatar : "https://vk.com/images/camera_200.png"}
        />
        <div className={styles.dialog__info}>
          <p className={styles.dialog__title}>{title}</p>
          <p className={styles.dialog__message}>{message}</p>
        </div>
      </div>
      <div className={styles.dialog__right}>
        <p className={styles.dialog__date}>
          {timeAgo("2023-04-12T19:22:22.000Z")}
        </p>
        {unread ? <p className={styles.dialog__unread}>{unread}</p> : null}
      </div>
    </div>
  );
};

export default Dialog;
