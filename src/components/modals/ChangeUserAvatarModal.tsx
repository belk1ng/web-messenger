import React from "react";
import withModal from "./withModal";
import { ModalType } from "../../contexts/ModalsContext";

const Content = () => {
  return <div>Feature in work :3</div>;
};

const ChangeUserAvatarModal = withModal(Content, ModalType.CHANGE_USER_AVATAR);

export default ChangeUserAvatarModal;
