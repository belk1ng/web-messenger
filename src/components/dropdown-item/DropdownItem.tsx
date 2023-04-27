import React, { FC } from "react";
import { DropdownItemProps } from "../dropdown-item/props";
import styles from "./DropdownItem.module.scss";
import classnames from "classnames";

const DropdownItem: FC<DropdownItemProps> = ({
  text,
  callback,
  modifier = "default",
}) => {
  return (
    <li
      className={classnames(styles.item, styles[`item--${modifier}`])}
      onClick={callback}
    >
      {text}
    </li>
  );
};

export default DropdownItem;
