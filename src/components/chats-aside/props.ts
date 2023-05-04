export interface ChatsAsideProps {
  children?: Children;
}

export interface CreateChatModalContentProps {
  reloadChats: () => Promise<void>;
  closeModal: VoidFunction;
}
