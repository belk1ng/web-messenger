import React, { useState, ChangeEvent } from "react";
import styles from "./UserSearch.module.scss";

const UserSearch = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <label className={styles.input}>
      <input
        className={styles.input__input}
        placeholder="Search user"
        value={value}
        onChange={handleChange}
        type="text"
      />
    </label>
  );
};

export default UserSearch;
