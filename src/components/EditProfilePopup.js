import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, switchLoader, buttonDisabled, onButtonDisabled, onButtonEnabled}) {
  // Валидация
  const [spanClassName, setSpanClassName] = useState('');
  const [spanClassAbout, setSpanClassAbout] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageAbout, setErrorMessageAbout] = useState('');
    
  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Стейт, в котором содержится значение инпутов
  const [valueName, setValueName] = useState('');
  const [valueAbout, setValueAbout] = useState('');

  // Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    handleNameValidation(e)
    setValueName(e.target.value)
  }

  // Обработчик изменения инпута о себе обновляет стейт
  function handleChangeAbout(e) {
    handleAboutValidation(e)
    setValueAbout(e.target.value);
  }
  
  //валидация инпута с именем
  function handleNameValidation(e) {
    if (!e.target.validity.valid) {
      setSpanClassName("_visible")
      onButtonDisabled()
      setErrorMessageName(e.target.validationMessage)
      } else {
      setSpanClassName("")
      onButtonEnabled()
      setErrorMessageName('')
      }
  }

    //валидация инпута с информацией о себе
    function handleAboutValidation(e) {
      if (!e.target.validity.valid) {
        setSpanClassAbout("_visible")
        onButtonDisabled()
        setErrorMessageAbout(e.target.validationMessage)
        } else {
        setSpanClassAbout("")
        onButtonEnabled()
        setErrorMessageAbout('')
        }
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
    setErrorMessageName('')
    setErrorMessageAbout('')
    onButtonEnabled()
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
    switchLoader={switchLoader}
    buttonDisabled={buttonDisabled}
    >
      <input className="popup__input popup__input_data_name" id="name" name="name" type="text" required placeholder="Имя"
      minLength="2" maxLength="40" value={valueName || ""} onChange={handleChangeName}/>
      <span className={`popup__error popup__error${spanClassName} name-error"`}>{errorMessageName}</span>
      <input className="popup__input popup__input_data_about" id="about" name="about" type="text" required placeholder="О себе"
      minLength="2" maxLength="200" value={valueAbout || ""} onChange={handleChangeAbout}/>
      <span className={`popup__error popup__error${spanClassAbout} name-error"`}>{errorMessageAbout}</span>
      </PopupWithForm>
  )
}
  
export default EditProfilePopup