import React, {useState, useEffect} from 'react';
import Header from './Нeader';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // Хуки, управляющие внутренним состоянием.
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpe] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deleteCard, setDeleteCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([ ]);
  
  //получение данных при первичном открытии страницы
  useEffect(() => {
    api.getDataApi()
     .then(([cardsData, userData]) => {
       setCurrentUser(userData); 
       setCards(cardsData); 
     })
     .catch(err => {
        console.log(err);
     })
   }, []);

  // Функции переключающие состояние при открытии попапов.
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpe(true)
  }
    
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  };

   function handleCardDeleteClick(card) {
      setDeleteCard(card);
   }; 

  // Функция переключающия состояние при закртытии попапов.
  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpe(false)
    setAddPlacePopupOpen(false)
    setSelectedCard({})
    setDeleteCard(null)
  }

  //!!Возможно нужно отредактировать функция должна срабатывать при изменении пользователя(Обработчик изменений)
  function handleUpdateUser(newUserData) {
    api.setUserInfoApi(newUserData)
      .then((newUserData) => {
        setCurrentUser(newUserData); 
        //closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
    closeAllPopups();
  }

  function handleUpdateAvatar(newUserAvatar) {
    api.setUserAvatarApi(newUserAvatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar); 
        //closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
    closeAllPopups();
  }


  function handleAddPlace(newCard) {
    api.addNewCardApi(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        //closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
    closeAllPopups();
  }


// // Хуки, при загрузке страницы получаем данные пользователя и карточек
// useEffect(() => {
//   api.getDataApi()
//   .then(([cardsData, userData]) => {
//     setCards(cardsData);
//    })
//   .catch(err => {
//   console.log(err);
//   })
//   }, [])

// функция отвечающая за удаление и добавления лайка
function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  if (!isLiked) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeApi(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } else {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.dislikeApi(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
} 

//функция отвечающая за удаление карточки
const handleCardDelete = (card) => { 
  api.deleteCardApi(card._id).then(() => {
      // используя методы массива, создаем новый массив карточек newCards, где не будет карточки, которую мы только что удалили */
      const newCards = cards.filter(i => i._id !== card._id);
      setCards(newCards);
  });
}


  
  // Разметка.
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main 
      onEditProfile={handleEditProfileClick}
      onEditAvatar={handleEditAvatarClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}

      cards={cards}
      onCardDelete={handleCardDeleteClick}
      onCardLike={handleCardLike}
      
      
      //onCardDelete={handleCardDelete}


      
      />
      <EditProfilePopup
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser} />  
      <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onAddPlace={handleAddPlace} 
      onClose={closeAllPopups}/>
      <ConfirmPopup
      //onCardDelete={handleCardDelete}
      isOpen={deleteCard}
      onClose={closeAllPopups}
      onDelete={handleCardDelete}
      />
      <ImagePopup
      name={'zoom-card'}
      card={selectedCard}
      onClose={closeAllPopups}
      />
      <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;