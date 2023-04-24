import React, { ReactNode, useContext, useMemo } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import Message from "../../message";
import styles from "./Messages.module.scss";
import { ChatMessage } from "../../../@types/chats";

const Messages = () => {
  const { messages } = useContext(ChatContext);

  const content = useMemo(() => {
    const _messages: ReactNode[] = [];

    let prevMessageDay = new Date(messages[0]?.time) ?? new Date();

    const addDate = (date: Date, key: string) => {
      _messages.unshift(
        <p key={key} className={styles.messages__group}>
          {date.getDate()} {date.toLocaleDateString("en", { month: "long" })}
        </p>
      );
    };

    const addMessage = (message: ChatMessage) => {
      _messages.unshift(<Message key={message.id} message={message} />);
    };

    messages.forEach((message) => {
      const messageTime = new Date(message.time);

      const messageDay = messageTime.getDate();

      if (prevMessageDay.getDate() === messageDay) {
        addMessage(message);
      } else {
        addDate(prevMessageDay, `d_${message.id}`);
        addMessage(message);

        prevMessageDay = messageTime;
      }
    });

    addDate(prevMessageDay, `start_day`);

    return _messages;
  }, [messages]);

  return <div className={styles.messages}>{content}</div>;
};

export default Messages;
