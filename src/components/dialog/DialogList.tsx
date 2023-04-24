import React, { FC, memo } from "react";
import Dialog from "./Dialog";
import { DialogListProps } from "./props";

const DialogList: FC<DialogListProps> = ({ list }) => {
  return (
    <ul>
      {list.map((dialog) => (
        <li key={dialog.id}>
          <Dialog dialog={dialog} />
        </li>
      ))}
    </ul>
  );
};

export default memo(DialogList);
