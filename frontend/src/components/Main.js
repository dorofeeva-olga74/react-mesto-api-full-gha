import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards,
    onCardLike, openDeletePopup, setSelectedCardIdToDeleteData }) {
    //подписка на контекст     
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__group">
                    <button onClick={onEditAvatar} className="profile__avatar-set" type="button" id="open-popup-avatar">
                        <img className={"profile__avatar"} src={currentUser.avatar} alt={"Аватарка"} />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} id="open-popup-button" type="button" className="profile__button profile__button_add_change" />
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} id="open-popup-button-add-card" type="button" className="profile__button profile__button_add_card" />
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        likes={card.likes}
                        name={card.name}
                        link={card.link}
                        owner={card.owner}
                        cardData={card}
                        onCardLike={onCardLike}
                        onCardClick={onCardClick}
                        openDeletePopup={openDeletePopup}
                        setSelectedCardIdToDeleteData={(card) => setSelectedCardIdToDeleteData(card)}
                    />
                ))}
            </section>
        </main>
    )
}
export default Main