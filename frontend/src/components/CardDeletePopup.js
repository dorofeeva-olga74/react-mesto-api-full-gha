import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function CardDeletePopup({ isOpen, onClose, onCloseOverlay, isLoading, handleCardDelete }) {
  
  function handleSubmit(e) {
    e.preventDefault();
    handleCardDelete(); 
  }  
  return (
    <PopupWithForm
      name={"delete-card-form"}
      title={"Вы уверены?"}
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
    />
  );
}