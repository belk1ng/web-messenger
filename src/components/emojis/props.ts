import { EmojiClickData } from "emoji-picker-react";

export interface EmojiesProps {
  onEmojiClick: (emojiData: EmojiClickData) => void;
}
