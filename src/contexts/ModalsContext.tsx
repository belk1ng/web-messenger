import React, {
  FC,
  createContext,
  useState,
  useMemo,
  useCallback,
} from "react";

export enum ModalType {
  "ADD_USER" = "add-user",
  "REMOVE_USER" = "remove-user",
  "CLOSED" = "",
  "CHANGE_USER_AVATAR" = "change-user-avatar",
  "CREATE_CHAT" = "create-chat",
}

interface ModalsContextValues {
  modal: ModalType;
  handleOpenModal: (value: ModalType) => void;
  handleCloseModal: VoidFunction;
}

interface ModalsContextProps {
  children: Children;
}

export const ModalsContext = createContext({} as ModalsContextValues);

const ModalsContextProvider: FC<ModalsContextProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalType>(ModalType.CLOSED);

  const handleOpenModal = useCallback((modalId: ModalType) => {
    setModal(modalId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal(ModalType.CLOSED);
  }, []);

  const value = useMemo(
    () => ({
      modal,
      handleOpenModal,
      handleCloseModal,
    }),
    [modal]
  );

  return (
    <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
  );
};

export default ModalsContextProvider;
