import React, { useContext } from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import { ModalType } from "../../contexts/ModalsContext";
import Modal from "../modal/Modal";

function withModal<P extends object>(
  ModalContentComponent: React.ComponentType<P>,
  modalId: ModalType,
  title?: string
) {
  const ModalContent = ({ ...props }: P) => {
    const { modal } = useContext(ModalsContext);

    return modal === modalId ? (
      <Modal active={modal === modalId} title={title}>
        <ModalContentComponent {...props} />
      </Modal>
    ) : (
      <></>
    );
  };

  return ModalContent;
}

export default withModal;
