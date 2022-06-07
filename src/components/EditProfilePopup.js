import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Стейт, в котором содержится значение инпутов
  const [valueName, setValueName] = useState('');
  const [valueAbout, setValueAbout] = useState('');

  // Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    setValueName(e.target.value);
    setValueAbout(e.target.value);
  }

  // Обработчик изменения инпута о себе обновляет стейт
  function handleChangeAbout(e) {
    setValueAbout(e.target.value);
  }

  // обработчик формы профиля
  function handleSubmit(e) {
       
    // Запрещаем браузеру переходить по адресу формы
   e.preventDefault();
      
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: valueName,
      about: valueAbout,
    });
  } 
  
  //Данные инпутов при открытии
  useEffect(() => {
    setValueName(currentUser.name);
    setValueAbout(currentUser.about);
  }, [currentUser]); 

  // Разметка
  return (
    <PopupWithForm
    isOpen={isOpen}
    onSubmit={handleSubmit}
    name={'edit-profile'}
    title={'Редактировать профиль'}
    formName={'popupFormProfile'}
    onClose={onClose}>
      <input className="popup__input popup__input_data_name" id="name" name="name" type="text" required placeholder="Имя"
      minLength="2" maxLength="40" value={valueName || ""} onChange={handleChangeName}/>
      <span className="popup__error name-error"></span>
      <input className="popup__input popup__input_data_about" id="about" name="about" type="text" required placeholder="О себе"
      minLength="2" maxLength="200" value={valueAbout || ""} onChange={handleChangeAbout}/>
      <span className="popup__error about-error"></span> 
      </PopupWithForm>
  )
}
  
export default EditProfilePopup