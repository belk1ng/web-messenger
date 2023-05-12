import React, { useContext, memo } from "react";
import Dropdown from "../../dropdown";
import DropdownItem from "../../dropdown-item";
import { ChatContext } from "../../../contexts/ChatContext";
import styles from "./ChatHeader.module.scss";

const ChatHeader = () => {
  const { chat } = useContext(ChatContext);

  return (
    <div className={styles.header}>
      <div className={styles.header__info}>
        <img
          className={styles.header__avatar}
          alt="Chat avatar"
          src="https://images.unsplash.com/photo-1681846291878-1103198eb2d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <h3 className={styles.header__title}>{chat?.title}</h3>
      </div>

      <div className={styles.chat__actions}>
        <Dropdown>
          <DropdownItem
            text="Add user"
            callback={() => console.log("add user")}
          />
          <DropdownItem
            modifier="danger"
            text="Remove user"
            callback={() => console.log("remove user")}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default memo(ChatHeader);
