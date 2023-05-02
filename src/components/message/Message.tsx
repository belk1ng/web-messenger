import React, { FC, memo } from "react";
import useAuth from "../../hooks/useAuth";
import { MessageProps } from "./props";
import styles from "./Message.module.scss";
import classnames from "classnames";
import sentAt from "../../utils/sentAt/sentAt";

const Message: FC<MessageProps> = ({ message }) => {
  const { user } = useAuth();

  return (
    <div
      className={classnames(
        styles.message,
        message.user_id === user?.id ? styles["message--mine"] : ""
      )}
    >
      {message.content}

      <p className={styles.message__time}>{sentAt(message.time)}</p>
    </div>
  );
};

export default memo(Message);
