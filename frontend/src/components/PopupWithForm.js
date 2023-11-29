import '../blocks/popup/_opened/popup_opened.css';
import React from 'react';

function PopupWithForm({ children, name, title, isOpen, onSubmit,
    onClose, buttonText, type, onCloseOverlay }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
            onClick={onCloseOverlay}>
            <div className="popup__container">
                <form onSubmit={onSubmit} action="#" name={`${name}`} className={`popup__form popup__${name}`}
                    onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type={type} className={"popup__button"}
                    >{buttonText}</button>
                </form>
                <button id={"close-popup-button"} type={"button"} aria-label={"Закрыть"}
                    onClick={onClose} className={"popup__close-button"} />
            </div>
        </div>
    )
}
export default PopupWithForm