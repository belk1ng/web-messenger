import React, { FC, useState } from "react";
import { DropdownProps } from "./props";
import classnames from "classnames";
import styles from "./Dropdown.module.scss";

const Dropdown: FC<DropdownProps> = ({ children }) => {
  const [showActions, setShowActions] = useState(false);

  const handleShowActions = () => {
    setShowActions(true);
  };

  const handleCloseActions = () => {
    setShowActions(false);
  };

  return (
    <div className={styles.dropdown} tabIndex={1} onBlur={handleCloseActions}>
      <div className={styles.dropdown__area} onClick={handleShowActions}>
        <svg
          width="3"
          height="16"
          viewBox="0 0 3 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="1.5" cy="2" r="1.5" fill="#3369F3" />
          <circle cx="1.5" cy="8" r="1.5" fill="#3369F3" />
          <circle cx="1.5" cy="14" r="1.5" fill="#3369F3" />
        </svg>
      </div>

      <ul
        className={classnames(
          styles.dropdown__actions,
          showActions
            ? styles["dropdown__actions--active"]
            : styles["dropdown__actions--hidden"]
        )}
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
