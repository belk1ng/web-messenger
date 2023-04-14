import React, { FC } from "react";
import { DialogProps } from "./props";
import styles from "./Dialog.module.scss";
import timeAgo from "../../utils/timeAgo";

const Dialog: FC<DialogProps> = ({ avatar, title, message, unread }) => {
  return (
    <div className={styles.dialog}>
      <img
        className={styles.dialog__avatar}
        alt="chat-avatar"
        src={avatar ? avatar : "https://vk.com/images/camera_200.png"}
      />
      <div className={styles.dialog__info}>
        <div className={styles.dialog__top}>
          <p className={styles.dialog__title}>{title}</p>
          <p className={styles.dialog__date}>
            {timeAgo("2023-04-14T17:35:22.000Z")}
          </p>
        </div>
        <div className={styles.dialog__bottom}>
          <p className={styles.dialog__message}>{message}</p>
          {unread ? (
            <p className={styles.dialog__unread}>
              {unread <= 99 ? unread : "99+"}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
