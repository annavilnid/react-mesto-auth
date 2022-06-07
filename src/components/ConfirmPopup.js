import React from 'react';
import PopupWithForm from './PopupWithForm'

function ConfirmPopup({isOpen, onClose, onConfirmDelete}) {

  //Обработчик формы
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDelete()
  }

  //Разметка
  return (
    <PopupWithForm
    isOpen={isOpen}
    name={'confirm-delete'}
    title={'Вы уверены?'}
    formName={'popupFormConfirm'}
    btnName={'Да'}
    onClose={onClose}
    onSubmit={handleSubmit} />
  )
}

export default ConfirmPopup