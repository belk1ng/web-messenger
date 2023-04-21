import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  useContext,
} from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import styles from "./MessageForm.module.scss";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const { handleSendMessage } = useContext(ChatContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const _message = message.trim();

    if (_message.length !== 0) {
      handleSendMessage(_message);
      setMessage("");
    }
  };

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        className={styles.form__input}
        placeholder="Message..."
        name="message"
      />
      <button className={styles.form__submit}>
        <svg
          rotate="180deg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            transform="rotate(-180 14 14)"
            fill="#3369F3"
          />
          <rect
            x="20"
            y="14.8"
            width="11"
            height="1.6"
            transform="rotate(-180 20 14.8)"
            fill="white"
          />
          <path d="M13 19L9 14L13 9" stroke="white" strokeWidth="1.6" />
        </svg>
      </button>
    </form>
  );
};

export default MessageForm;
