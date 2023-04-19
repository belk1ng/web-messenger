import React, { FC, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import styles from "./Dialog.module.scss";
import { DialogProps } from "./props";
import timeAgo from "../../utils/timeAgo";
import ChatsAPI from "../../api/chats";

const Dialog: FC<DialogProps> = ({
  id,
  avatar,
  title,
  message,
  unread,
  sentAt,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (socket) {
      socket.addEventListener("open", () => {
        console.log("Соединение установлено");

        socket.send(
          JSON.stringify({
            content: "0",
            type: "get old",
          })
        );

        socket.send(
          JSON.stringify({
            content: `Hello from ${user?.second_name}`,
            type: "message",
          })
        );
      });

      socket.addEventListener("close", (event) => {
        if (event.wasClean) {
          console.log("Соединение закрыто чисто");
        } else {
          console.log("Обрыв соединения");
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        setSocket(null);
      });

      socket.addEventListener("message", (event) => {
        console.log("Получены данные: ", event.data);
      });

      socket.addEventListener("error", (event) => {
        console.log("Ошибка", event);
      });
    }
  }, [socket]);

  const { user } = useAuth();

  const handleDialogClick = async () => {
    if (user) {
      const response = await ChatsAPI.getToken(id);

      if (
        response?.data &&
        response.status === 200 &&
        typeof response.data === "object" &&
        !("reason" in response.data)
      ) {
        const {
          data: { token },
        } = response;
        const userId = user.id;
        const chatId = id;

        const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;

        const socket = new WebSocket(url);

        setSocket(socket);
      }
    }
  };

  return (
    <div className={styles.dialog} onClick={handleDialogClick}>
      <img
        className={styles.dialog__avatar}
        alt="chat-avatar"
        src={avatar ? avatar : "https://vk.com/images/camera_200.png"}
      />
      <div className={styles.dialog__info}>
        <div className={styles.dialog__top}>
          <p className={styles.dialog__title}>{title}</p>
          {sentAt && <p className={styles.dialog__date}>{timeAgo(sentAt)}</p>}
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
