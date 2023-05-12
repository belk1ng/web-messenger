import React, {
  useState,
  useContext,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import Button from "../button/Button";
import withModal from "./withModal";
import { ModalType } from "../../contexts/ModalsContext";
import useAuth from "../../hooks/useAuth";
import UserAPI from "../../api/user";
import classnames from "classnames";
import styles from "./Modals.module.scss";

const Content = () => {
  const [file, setFile] = useState<Nullable<File>>(null);

  const [error, setError] = useState("");

  const { handleCloseModal } = useContext(ModalsContext);

  const { setUser } = useAuth();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!file) {
      setError("File is required");
    } else {
      setError("");

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await UserAPI.updateAvatar(formData);

      if (
        response &&
        response.data &&
        typeof response.data === "object" &&
        response.status === 200 &&
        !("reason" in response.data)
      ) {
        const updatedUserValues = response.data;
        setUser(updatedUserValues);
        handleCloseModal();
      } else {
        setError(
          "Something went wrong. Please select another file or try again later."
        );
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    setFile(files?.length === 1 ? files[0] : null);
    setError("");
  };

  return (
    <div className={classnames(styles.modal, styles["modal--avatar"])}>
      <form className={styles.modal__form} noValidate onSubmit={handleSubmit}>
        <label className={styles["modal__file--wrapper"]}>
          <p className={styles.modal__file}>Upload a file</p>
          {file && (
            <p
              className={styles.modal__filename}
              onClick={(event) => event.preventDefault()}
            >
              {file.name}
            </p>
          )}
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            hidden
            onChange={handleChange}
          />
        </label>
        <Button variant="button" text="Update" modifier="primary" />
        {error && <p className={styles.modal__error}>{error}</p>}
      </form>
    </div>
  );
};

const ChangeUserAvatarModal = withModal(
  Content,
  ModalType.CHANGE_USER_AVATAR,
  "Update avatar"
);

export default ChangeUserAvatarModal;
