import '../blocks/popup/_opened/popup_opened.css';
import React from "react";
import imgSuccess from "../images/img__success.svg";
import imgFail from "../images/img__fail.svg";

function InfoTooltip({ status, isOpen, onClose, text, onCloseOverlay }) {

  const img = status ? imgSuccess : imgFail;
  return (
    <div className={`popup popup_type_success-form ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseOverlay}>
      <div className="popup__container">
        <div className="popup__form" onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
          <img className="popup__auth-img" src={img} alt={text} />
          <p className="popup__info-text">{text}</p>
        </div>
        <button id={"close-popup-button"} type={"button"} aria-label={"Закрыть"}
          onClick={onClose} className={"popup__close-button"} />
      </div>
    </div>
  )
}
export default InfoTooltip