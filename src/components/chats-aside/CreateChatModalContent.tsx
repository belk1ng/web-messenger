import React, { FC } from "react";
import FormInput from "../form-input";
import Button from "../button";
import useForm from "../../hooks/useForm";
import {
  VALIDATION_FIELD,
  chatTitleMessage,
  chatTitleRegExp,
} from "../../utils/validate/validate";
import ChatsAPI from "../../api/chats";
import { CreateChatModalContentProps } from "./props";
import styles from "./ChatsAside.module.scss";

export const CreateChatModalContent: FC<CreateChatModalContentProps> = ({
  reloadChats,
  closeModal,
}) => {
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
      closeModal();
    }
  };

  const { data, errors, handleChange, handleSubmit } = useForm({
    initState,
    onSubmit,
    validations,
  });

  return (
    <div className={styles.modal}>
      <h3 className={styles.modal__title}>Create chat</h3>

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

export default CreateChatModalContent;
