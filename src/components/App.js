import React from 'react';
import Header from './Нeader';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  // Хуки, управляющие внутренним состоянием.
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpe] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [deliteCard, setDeliteCard] = React.useState(false);
  
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

  function handleCardDelite(card) {
    setDeliteCard(card);
  }
  // Функции переключающие состояние при закртытии попапов.
  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpe(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(false)
    setDeliteCard(false)
  }
  
  // Разметка.
  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardDelite={handleCardDelite}
      />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        name={'edit-profile'}
        title={'Редактировать профиль'}
        formname={'popupFormProfile'}
        btnName={'Сохранить'}
        onClose={closeAllPopups}
        children={
          <>
            <input className="popup__input popup__input_data_name" id="name" name="name" type="text" required placeholder="Имя"
            minLength="2" maxLength="40"/>
            <span className="popup__error name-error"></span>
            <input className="popup__input popup__input_data_about" id="about" name="about" type="text" required placeholder="О себе"
            minLength="2" maxLength="200"/>
            <span className="popup__error about-error"></span>
          </>
        }
      />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        name={'edit-avatar'}
        title={'Обновить аватар'}
        formname={'popupFormAvatar'}
        btnName={'Сохранить'}
        onClose={closeAllPopups}
        children={
          <>
          <input className="popup__input popup__input_data_about" id="avatar" name="avatar" type="url" required placeholder="Ссылка на картинку" />
          <span className="popup__error avatar-error"></span>
          </>
        }
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        name={'add-card'}
        title={'Новое место'}
        formname={'popupFormCard'}
        btnName={'Создать'}
        onClose={closeAllPopups}
        children={
          <>
          <input className="popup__input popup__input_data_place" id="place" name="name" type="text" required placeholder="Название"
          minLength="2" maxLength="30"/>
          <span className="popup__error place-error"></span>
          <input className="popup__input popup__input_data_place-link" id="link" name="link" type="url" required placeholder="Ссылка на картинку"/>
          <span className="popup__error link-error"></span>
          </>
        }
      />
      <PopupWithForm
        isOpen={deliteCard}
        name={'confirm-delete'}
        title={'Вы уверены?'}
        formname={'popupFormConfirm'}
        btnName={'Да'}
        onClose={closeAllPopups}
      />
      <ImagePopup
        name={'zoom-card'}
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />

    </div>
  );
}

export default App;
