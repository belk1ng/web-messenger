import React, { forwardRef } from "react";
import { ScollbarProps } from "./props";
import Scrollbars from "react-custom-scrollbars-2";
import classnames from "classnames";
import styles from "./Scrollbar.module.scss";

const Scrollbar = forwardRef<Scrollbars, ScollbarProps>((props, ref) => {
  return (
    <Scrollbars
      ref={ref}
      autoHide
      autoHideTimeout={400}
      autoHideDuration={500}
      renderTrackVertical={(_props) => (
        <div
          {..._props}
          className={classnames(
            styles.scrollbar__track,
            styles["scrollbar__track--vertical"]
          )}
        />
      )}
      renderThumbVertical={(_props) => (
        <div
          {..._props}
          className={classnames(
            styles.scrollbar__thumb,
            styles["scrollbar__thumb--vertical"]
          )}
        />
      )}
    >
      {props.children}
    </Scrollbars>
  );
});

Scrollbar.displayName = "CustomScrollbar";

export default Scrollbar;
