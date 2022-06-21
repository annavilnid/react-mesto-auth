import React from "react"
import headerLogo from '../images/header-logo.svg';
import iconlogo1 from '../images/icon1.svg';
import iconlogo2 from '../images/ivon2.svg'

// Разметка
function InfoTooltip({name, isOpen, isloggedIn, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <img className="popup__image" src={`${isloggedIn? iconlogo1 : iconlogo2 }`} alt="иконка результата"/>
        <h2 className="popup__title">{isloggedIn? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      <button className="popup__close-button" onClick={onClose} type="button" aria-label="закрыть"></button>
        </div>
    </div>
  )
}

export default InfoTooltip