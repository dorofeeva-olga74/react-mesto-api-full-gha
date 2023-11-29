import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const { isOpen, onClose, onCloseOverlay, onUpdateUser, isLoading } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e, name, about) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(name, about);
  }
  return (
    <PopupWithForm
      name={"edit-form"}
      title={"Редактировать профиль"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={(e) => handleSubmit(e, name, description)}
    >
      <div className={"popup__inputs"}>
        <input required id={"name-input"}
          name={"userName"}
          type={"text"}
          className={"popup__input"}
          placeholder={"Жак-Ив Кусто"}
          value={name || " "}
          onChange={(e) => setName(e.target.value)}
          autoComplete={"on"}
          minLength={"2"}
          maxLength={"40"} />
        <p className={"popup__error popup__error_visible"} />
        <input required id={"proffession-input"}
          name={"aboutUser"}
          type={"text"}
          className={"popup__input"}
          placeholder={"Исследователь океана"}
          value={description || " "}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete={"on"}
          minLength={"2"}
          maxLength={"200"} />
        <p className={"popup__error popup__error_visible"} />
      </div>
    </PopupWithForm>
  );
}