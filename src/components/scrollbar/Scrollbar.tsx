import React, { FC } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { ScollbarProps } from "./props";
import classnames from "classnames";
import styles from "./Scrollbar.module.scss";

const Scrollbar: FC<ScollbarProps> = ({ children }) => {
  return (
    <Scrollbars
      renderTrackVertical={(props) => (
        <div
          {...props}
          className={classnames(
            styles.scrollbar__track,
            styles["scrollbar__track--vertical"]
          )}
        />
      )}
      renderThumbVertical={(props) => (
        <div
          {...props}
          className={classnames(
            styles.scrollbar__thumb,
            styles["scrollbar__thumb--vertical"]
          )}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
