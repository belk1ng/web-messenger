import React, { FC, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { DropdownProps } from "./props";
import styles from "./Dropdown.module.scss";

const Dropdown: FC<DropdownProps> = ({ children }) => {
  const [showActions, setShowActions] = useState(false);

  const listRef = useRef<Nullable<HTMLUListElement>>(null);

  const toggleShowActions = () => {
    setShowActions((prev) => !prev);
  };

  const handleCloseActions = () => {
    setShowActions(false);
  };

  return (
    <div className={styles.dropdown} tabIndex={1} onBlur={handleCloseActions}>
      <div className={styles.dropdown__area} onClick={toggleShowActions}>
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

      <CSSTransition
        nodeRef={listRef}
        timeout={250}
        classNames={{
          enter: styles["dropdown__actions--enter"],
          enterActive: styles["dropdown__actions--enter-active"],
          exit: styles["dropdown__actions--exit"],
          exitActive: styles["dropdown__actions--exit-active"],
        }}
        in={showActions}
        unmountOnExit
        appear
      >
        <ul className={styles.dropdown__actions} ref={listRef}>
          {children}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
