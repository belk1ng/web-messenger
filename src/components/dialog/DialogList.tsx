import React, { FC } from "react";
import Dialog from "./Dialog";
import { DialogListProps } from "./props";

const DialogList: FC<DialogListProps> = ({ list, handleChatConnect }) => {
  return (
    <ul>
      {list.map((dialog) => (
        <li key={dialog.id}>
          <Dialog dialog={dialog} handleChatConnect={handleChatConnect} />
        </li>
      ))}
    </ul>
  );
};

export default DialogList;
