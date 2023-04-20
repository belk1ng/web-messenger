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
      <button className={styles.form__submit}>submit</button>
    </form>
  );
};

export default MessageForm;
