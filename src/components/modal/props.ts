export interface ModalProps {
  active: boolean;
  setActive: (value: boolean) => void;

  children: Children;
}
