import React, { FC } from "react";
import { DialogProps } from "./props";
import styles from "./Dialog.module.scss";

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
        <p className={styles.dialog__date}>12:02</p>
        {unread ? <p className={styles.dialog__unread}>{unread}</p> : null}
      </div>
    </div>
  );
};

export default Dialog;
