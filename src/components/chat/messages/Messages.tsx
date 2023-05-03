import React, { FC, ReactNode, useMemo, useCallback } from "react";
import Message from "../../message";
import groupBy from "../../../utils/groupBy";
import styles from "./Messages.module.scss";
import { ChatMessage } from "../../../@types/chats";

interface Props {
  messages: ChatMessage[];
}

const Messages: FC<Props> = ({ messages }) => {
  const _messageGroupCriteria = useCallback((message: ChatMessage) => {
    const date = new Date(message.time);

    return `${date.getDate()} ${date.toLocaleDateString("en", {
      month: "long",
    })} ${date.getFullYear()}`;
  }, []);

  const content = useMemo(() => {
    const messagesGroup = groupBy(messages, _messageGroupCriteria);

    const entries = Object.entries(messagesGroup);

    const messagesAndDates: ReactNode[] = [];

    entries?.forEach(([date, messages]) => {
      messages.forEach((message) => {
        messagesAndDates.unshift(
          <Message message={message} key={message.id} />
        );
      });

      messagesAndDates.unshift(
        <p className={styles.messages__group} key={`date_${messages[0].id}`}>
          {date}
        </p>
      );
    });

    return messagesAndDates;
  }, [messages, _messageGroupCriteria]);

  return <div className={styles.messages}>{content}</div>;
};

export default Messages;
