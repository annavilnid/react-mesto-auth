import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, switchLoader}) {
  // Валидация
  const [spanClassName, setSpanClassName] = useState('');
  const [spanClassAbout, setSpanClassAbout] = useState('');
    
  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Стейт, в котором содержится значение инпутов
  const [valueName, setValueName] = useState('');
  const [valueAbout, setValueAbout] = useState('');


  // Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    if (!e.target.validity.valid) {
      setSpanClassName("_visible")
      } else {
      setSpanClassName("")
      }
    setValueName(e.target.value)
  }

  // Обработчик изменения инпута о себе обновляет стейт
  function handleChangeAbout(e) {
    if (!e.target.validity.valid) {
      setSpanClassAbout("_visible")
      } else {
      setSpanClassAbout("")
      }
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
  
  //Данные инпутов певом открытии
  useEffect(() => {
    setValueName(currentUser.name);
    setValueAbout(currentUser.about);
  }, [currentUser]); 
   
  // закрытие и актуализация значений инпута для повторного открытия
  function hendleClose() {
    onClose()
    setValueName(currentUser.name);
    setValueAbout(currentUser.about);
  }

  // Разметка
  return (
    <PopupWithForm
    isOpen={isOpen}
    onSubmit={handleSubmit}
    name={'edit-profile'}
    title={'Редактировать профиль'}
    formName={'popupFormProfile'}
    onClose={hendleClose}
    switchLoader={switchLoader}>
      <input className="popup__input popup__input_data_name" id="name" name="name" type="text" required placeholder="Имя"
      minLength="2" maxLength="40" value={valueName || ""} onChange={handleChangeName}/>
      <span className={`popup__error popup__error${spanClassName} name-error"`}>не проходит валидацию</span>
      <input className="popup__input popup__input_data_about" id="about" name="about" type="text" required placeholder="О себе"
      minLength="2" maxLength="200" value={valueAbout || ""} onChange={handleChangeAbout}/>
      <span className={`popup__error popup__error${spanClassAbout} name-error"`}>не проходит валидацию</span>
      </PopupWithForm>
  )
}
  
export default EditProfilePopup