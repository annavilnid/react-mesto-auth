import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, formname, btnName, children}) {
// Разметка 
  return (
     <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : false}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={onClose} ></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_action_${name}`} name={formname} noValidate>
          {children}
          <button className="popup__save-button" type="submit">{btnName}</button>
       </form>
      </div>
    </div>
  )
}
  
export default PopupWithForm