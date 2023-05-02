import React, { FC, memo } from "react";
import Dialog from "./Dialog";
import { DialogListProps } from "./props";
import DialogSkeleton from "./DialogSkeleton";

const DialogList: FC<DialogListProps> = ({ list }) => {
  return (
    <ul>
      {list.map((dialog, index) => {
        return dialog ? (
          <li key={dialog.id}>
            <Dialog dialog={dialog} />
          </li>
        ) : (
          <li key={index}>
            <DialogSkeleton />
          </li>
        );
      })}
    </ul>
  );
};

export default memo(DialogList);
