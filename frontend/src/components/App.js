import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import api from "../utils/Api/Api.js";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { register, authorize, checkToken } from "../utils/Auth/Auth.js";

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import CardDeletePopup from "./CardDeletePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [selectedCardIdToDelete, setSelectedCardIdToDelete] = useState("");
  const [selectedCard, setSelectedCard] = useState({});//для всплывающей картинки
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingUpdateAvatar, setIsLoadingUpdateAvatar] = useState(false);
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false);
  const [isLoadingAddPlace, setIsLoadingAddPlace] = useState(false);
  const [isLoadingCardDelete, setIsLoadingCardDelete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);//зарегистрирован пользователь или нет
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState(false);
  const [userEmail, setUserEmail] = useState("");



  // добавляю обработчики  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const openDeletePopup = () => {
    setIsCardDeletePopupOpen(true);
  }
  //закрытие по оверлею
  const handleOverlayClick = (e) => {
    if (e.target?.className?.includes('popup')) {
      closeAllPopups();
    }
  };
  //Обработчик Escape
  const isSomePopupOpen = isInfoTooltipOpened || isCardDeletePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link
  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isSomePopupOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isSomePopupOpen])

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipStatus(false);
    setIsInfoTooltipOpened(false);
  }

  function handleUpdateAvatar(data) {
    setIsLoadingUpdateAvatar(true)
    api.changeAvatarUrl({
      avatar: data.avatar,
    })
      .then(() => {
        closeAllPopups();
        setCurrentUser((userInfoAnswer) => ({
          ...userInfoAnswer,
          avatar: data.avatar,
        }));

      })
      .catch((e) => console.error(e?.reason || e?.message))
      .finally(() => setIsLoadingUpdateAvatar(false));
  }

  function handleUpdateUser(name, about) {
    setIsLoadingUpdateUser(true)
    api.changeUserData({
      name: name,
      about: about,
    })
      .then(() => {
        closeAllPopups();
        setCurrentUser((userInfoAnswer) => ({
          ...userInfoAnswer,
          name: name,
          about: about,
        }));
      })
      .catch((e) => console.error(e?.reason || e?.message))
      .finally(() => setIsLoadingUpdateUser(false))
  }

  function setSelectedCardIdToDeleteData(currentCardId) {
    setSelectedCardIdToDelete(currentCardId)
  }
 //загузка карточек
 const handleAddPlaceSubmit = async (data) => {
  setIsLoadingAddPlace(true)
  try {
    const newCard = await api.createCardApi(data);
    //console.log(await api.createCardApi(data))
    console.log(newCard)
    setCards([newCard, ...cards]);
    closeAllPopups();
    setIsLoadingAddPlace(false);
  } catch (err) {
    console.log(err)
  } 
}
  // function handleAddPlaceSubmit(data) {
  //   setIsLoadingAddPlace(true)
  //   api.createCardApi({
  //     name: data.name,
  //     link: data.link,
  //   })
  //     .then((newCard) => {
  //       closeAllPopups();
  //       setCards(prev => ([
  //         ...prev,
  //         newCard
  //       ]));
  //     })
  //     .catch((e) => console.error(e?.reason || e?.message))
  //     .finally(() => setIsLoadingAddPlace(false))
  // }
  // удаление
  function handleCardDelete() {
    setIsLoadingCardDelete(true)
    api.deleteCardApi(selectedCardIdToDelete)
      .then(() => {
        closeAllPopups();
        setCards((state) => state.filter((cardDelete) => selectedCardIdToDelete !== cardDelete._id));
      })
      .catch((e) => console.error(e?.reason || e?.message))
      .finally(() => setIsLoadingCardDelete(false))
  }
  function handleCardLike(card) {
    const isLiked = card.cardData.likes.some((id) => id === currentUser._id);
    if (isLiked) {
      api.deleteLikeCardData(card.cardData._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card.cardData._id ? newCard : c));
        })
        .catch((e) => console.error(e?.reason || e?.message))
    } else {
      api.addLikeCardData(card.cardData._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card.cardData._id ? newCard : c)));
        })
        .catch((e) => console.error(e?.reason || e?.message))
    }
  }
  ///
  // const getCurrentUserInfo = async () => {
  //   try {
  //     const currentUserInfo = await api.getProfileInfo();
  //     setCurrentUser(currentUserInfo);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // const getCards = async () => {
  //   try {
  //     const apiCards = await api.getInitialCards();
  //     //console.log(apiCards.data);
  //     setCards(apiCards.data);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  ///
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn]);  

  // useEffect(() => {
  //   if(isLoggedIn) {
  //     getCurrentUserInfo();
  //     getCards();
  //   }
  // }, [isLoggedIn])

  ////РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ - САБМИТ
  const handleRegisterSubmit = async (data) => {
    try {
      await register(data);
      setIsInfoTooltipStatus(true);
      navigate("/sign-in");
    } catch (err) {
      //console.log(err);
      setIsInfoTooltipStatus(false);
    } finally {
      setIsInfoTooltipOpened(true);
    }
  }  
  //АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ - САБМИТ
  const handleLoginSubmit = async (data) => {
    try {
      const { token } = await authorize(data);
      localStorage.setItem('token', token);
      setUserEmail(data.email);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus(false);
    }
  }
  //ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setUserEmail(data.email);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [navigate])  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([userInfoAnswer, cardsAnswer]) => {
          setCurrentUser(userInfoAnswer);
          setCards(cardsAnswer.reverse());
        })
        .catch((e) => console.error(e?.reason || e?.message));
    }
  }, [isLoggedIn]);
  
  //ВЫХОД
  const handleExitUser = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate("/sign-in");
  }
  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} handleExitUser={handleExitUser} />
        <Routes>
          <Route path="/sign-up" element={<Register onSubmit={handleRegisterSubmit} />} />
          <Route path="/sign-in" element={<Login onSubmit={handleLoginSubmit} />} />
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}/*новые пропсы*/
                onAddPlace={handleAddPlaceClick}/*новые пропсы*/
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                openDeletePopup={openDeletePopup}
                handleCardDelete={handleCardDelete}
                setSelectedCardIdToDeleteData={(data) => setSelectedCardIdToDeleteData(data)}//получение данных карточки для удаления
              />
            </ProtectedRoute>
          } />
          <Route path="/*" element={isLoggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          setIsOpen={setSelectedCard}
          onCloseOverlay={handleOverlayClick} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoadingUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
          onAddNewPlace={handleAddPlaceSubmit}
          isLoading={isLoadingAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoadingUpdateAvatar}
        />
        <CardDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
          onCardDelete={handleAddPlaceSubmit}
          handleCardDelete={handleCardDelete}
          isLoading={isLoadingCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          onCloseOverlay={handleOverlayClick}
          onClose={closeAllPopups}
          status={isInfoTooltipStatus}
          text={isInfoTooltipStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;