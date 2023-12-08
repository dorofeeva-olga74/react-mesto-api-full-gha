import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';

export default function Card(props) {
  const { name, link, likes, owner, openDeletePopup, setSelectedCardIdToDeleteData } = props;
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner === currentUser._id;
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.cardData.likes.some(id => id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? "element__like_active" : "element__like"}`;

  function handleCardClick() {
    props.onCardClick(props)
  }
  function handleLikeClick() {
    props.onCardLike(props)
  }
  function handleDeletePopupClick() {
    openDeletePopup();
    setSelectedCardIdToDeleteData(props.cardData._id);
  }
  return (
    <article className="element">
      {isOwn && (
        <button id={"delete-button"}
          className={"element__delete"}
          type={"reset"}
          aria-label="Кнопка удалить карточку"
          onClick={handleDeletePopupClick}
        />)}
      <button id={"show-image"} className={"element__show-img"} type={"button"} onClick={handleCardClick}>
        <img className={"element__img"} src={link} alt={name} />
      </button>
      <div className={"element__card"}>
        <h2 className={"element__title"}>{name}</h2>
        <div className={"element__like-section"}>
          <button id={"like-button"} type={"button"} aria-label={"Кнопка лайка"}
            className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className={"element__like-counter"}>{likes.length}</p>
        </div>
      </div>
    </article>
  )
}