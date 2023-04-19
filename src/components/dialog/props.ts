export interface DialogProps {
  id: number;
  title: string;
  avatar?: string | null;
  message?: string;
  sentAt?: string;

  unread?: number;
}
