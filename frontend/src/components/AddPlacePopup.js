import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onCloseOverlay, onAddNewPlace, isLoading }) {
  const [name, setCardName] = useState("");
  const [link, setCardLink] = useState("");

  const handleChangeCardNameClick = (e) => {
    setCardName(e.target.value)
  }

  const handleChangeCardLinkClick = (e) => {
    setCardLink(e.target.value)
  }

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddNewPlace({ name, link });
  }
  return (
    <PopupWithForm
      name="add-place-form"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="popup__inputs">
        <input required
          id="place-input"
          type="text"
          name="cardName"
          className="popup__input popup__input_card_name"
          placeholder="Название"
          autoComplete="on"
          minLength="2"
          maxLength="30"
          onChange={handleChangeCardNameClick}
          value={name || ""} />
        <p className="popup__error popup__error_visible" />
        <input required
          id="link-input"
          type="url"
          name="link"
          className="popup__input popup__input_card_link"
          placeholder="Ссылка на картинку"
          autoComplete={"on"}
          onChange={handleChangeCardLinkClick}
          value={link || ""} />
        <p className="popup__error popup__error_visible" />
      </div>
    </PopupWithForm>
  );
}