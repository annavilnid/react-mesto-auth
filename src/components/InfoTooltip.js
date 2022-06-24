import React from "react"
import success from '../images/success.svg';
import fail from '../images/fail.svg'

// Разметка
function InfoTooltip({name, isOpen, isloggedIn, isRegistreted, onClose}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <img className="popup__image" src={`${isloggedIn || isRegistreted ? success : fail }`} alt="иконка результата"/>
        <h2 className="popup__title">{isloggedIn || isRegistreted ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      <button className="popup__close-button" onClick={onClose} type="button" aria-label="закрыть"></button>
        </div>
    </div>
  )
}

export default InfoTooltip