import React, { FC, useState, memo } from "react";
import EmojiPicker from "emoji-picker-react";
import Smile from "../../assets/icons/Smile";
import { EmojiesProps } from "./props";
import classnames from "classnames";
import styles from "./Emojies.module.scss";

const Emojies: FC<EmojiesProps> = ({ onEmojiClick }) => {
  const [pickerActive, setPickerActive] = useState(false);

  const handleOpenPicker = () => {
    setPickerActive(true);
  };

  const handleClosePicker = () => {
    setPickerActive(false);
  };

  return (
    <section
      className={classnames(
        styles.emojies,
        pickerActive && styles["emojies--active"]
      )}
      onMouseOver={handleOpenPicker}
      onMouseLeave={handleClosePicker}
    >
      <Smile />

      {pickerActive && (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          previewConfig={{
            showPreview: false,
          }}
          lazyLoadEmojis={true}
          autoFocusSearch={false}
          skinTonesDisabled={true}
        />
      )}
    </section>
  );
};

export default memo(Emojies);
