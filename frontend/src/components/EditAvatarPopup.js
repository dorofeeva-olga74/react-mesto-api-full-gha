import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onCloseOverlay, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={"avatar-form"}
      title={"Обновить аватар"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
    >
      <div className={"popup__inputs"}>
        <input ref={avatarRef}
          id={"link-avatar"}
          type={"url"}
          name={"avatar"}
          className={"popup__input popup__input_avatar_link"}
          required=""
          placeholder={"Ссылка на фотографию"}
          autoComplete={"on"} />
        <p className={"popup__error popup__error_visible"} />
      </div>
    </PopupWithForm>
  )
}