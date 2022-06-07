import React from 'react';
import PopupWithForm from './PopupWithForm'

function ConfirmPopup({isOpen, onClose, onDelete}) {

const [cardForDelete, setCardForDelete] = React.useState({})

function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    //setIsConfirmPopupOpen(true);
}

const handleCardDelete = (e) => {
   e.preventDefault(e);
   onDelete(cardForDelete)
}

  return (
    <PopupWithForm
    isOpen={isOpen}
    name={'confirm-delete'}
    title={'Вы уверены?'}
    formName={'popupFormConfirm'}
    btnName={'Да'}
    onClose={onClose}
    onSubmit={handleCardDelete}
    />
  )
}

export default ConfirmPopup