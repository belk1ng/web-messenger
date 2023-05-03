import React, { FC, useState, ChangeEvent, useCallback } from "react";
import CloseIcon from "../../assets/icons/Close";
import debounce from "../../utils/debounce";
import { ChatSearchProps } from "./props";
import styles from "./ChatSearch.module.scss";

const ChatSearch: FC<ChatSearchProps> = ({ setSearchQuery }) => {
  const [value, setValue] = useState("");

  const updateSearchQuery = useCallback(debounce(setSearchQuery, 500), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setValue(newValue);
    updateSearchQuery(newValue);
  };

  const handleResetClick = () => {
    setValue("");
    setSearchQuery("");
  };

  return (
    <label className={styles.input}>
      {value && (
        <div className={styles.input__reset} onClick={handleResetClick}>
          <CloseIcon />
        </div>
      )}
      <input
        className={styles.input__input}
        placeholder="Chats search"
        value={value}
        onChange={handleChange}
        type="text"
      />
    </label>
  );
};

export default ChatSearch;
