import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  useContext,
  useCallback,
  memo,
} from "react";
import { EmojiClickData } from "emoji-picker-react";
import Emojies from "../../emojies";
import Send from "../../../assets/icons/Send";
import { ChatContext } from "../../../contexts/ChatContext";
import styles from "./MessageForm.module.scss";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const { handleSendMessage } = useContext(ChatContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  }, []);

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
      <Emojies onEmojiClick={handleEmojiClick} />
      <button className={styles.form__submit}>
        <Send />
      </button>
    </form>
  );
};

export default memo(MessageForm);
