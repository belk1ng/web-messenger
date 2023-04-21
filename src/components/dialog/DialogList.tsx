import React, { FC, useContext, memo } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import Dialog from "./Dialog";
import { DialogListProps } from "./props";

const DialogList: FC<DialogListProps> = ({ list }) => {
  const { handleChatConnect } = useContext(ChatContext);

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

export default memo(DialogList);
