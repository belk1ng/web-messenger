import React, { forwardRef } from "react";
import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars-2";
import classnames from "classnames";
import styles from "./Scrollbar.module.scss";

const Scrollbar = forwardRef<Scrollbars, ScrollbarProps>((props, ref) => {
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
      renderView={(_props) => <div {..._props} onScroll={props?.onScroll} />}
    >
      {props.children}
    </Scrollbars>
  );
});

Scrollbar.displayName = "CustomScrollbar";

export default Scrollbar;
