import React, { FC, useContext } from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import FormInput from "../form-input";
import Button from "../button";
import useForm from "../../hooks/useForm";
import {
  VALIDATION_FIELD,
  chatTitleMessage,
  chatTitleRegExp,
} from "../../utils/validate/validate";
import ChatsAPI from "../../api/chats";
import styles from "./Modals.module.scss";
import withModal from "./withModal";
import { ModalType } from "../../contexts/ModalsContext";

export interface CreateChatModalProps {
  reloadChats: () => Promise<void>;
}

export const Content: FC<CreateChatModalProps> = ({ reloadChats }) => {
  const { handleCloseModal } = useContext(ModalsContext);

  const initState = {
    title: "",
  };

  const validations = {
    title: {
      pattern: {
        value: chatTitleRegExp,
        message: chatTitleMessage,
      },
    },
  };

  const onSubmit = async () => {
    const response = await ChatsAPI.createChat(data.title);

    if (response?.status === 200) {
      await reloadChats();
      handleCloseModal();
    }
  };

  const { data, errors, handleChange, handleSubmit } = useForm({
    initState,
    onSubmit,
    validations,
  });

  return (
    <div className={styles.modal}>
      <form className={styles.modal__form} noValidate onSubmit={handleSubmit}>
        <FormInput
          name="title"
          type="text"
          label="Chat title"
          value={data.title}
          error={errors.title}
          onChange={() => handleChange("title")}
          validationRule={VALIDATION_FIELD.CHAT_TITLE}
        />

        <Button text="Create" variant="button" modifier="primary" />
      </form>
    </div>
  );
};

const CreateChatModal = withModal(
  Content,
  ModalType.CREATE_CHAT,
  "Create chat"
);

export default CreateChatModal;
