import React, { ReactNode, useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import Message from "../../message";
import styles from "./Messages.module.scss";

const Messages = () => {
  const { messages } = useContext(ChatContext);

  return (
    <div className={styles.messages}>
      {messages?.reduce(
        (acc: ReactNode[], message) => [
          <Message key={message.id} message={message} />,
          ...acc,
        ],
        []
      )}
    </div>
  );
};

export default Messages;
