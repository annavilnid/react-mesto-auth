import React, {useRef} from "react"
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace, switchLoader}) {
  
  //Рефы, доступ к DOM-узлам
  const textInputName = useRef('');
  const textInputLink = useRef('');

 // Обработчик формы
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: textInputName.current.value, 
      link: textInputLink.current.value,
    });
      textInputName.current.value = ''
      textInputLink.current.value = ''
  } 

  function hendleClose() {  
  onClose()   
  textInputName.current.value = ''
  textInputLink.current.value = ''
  }

  // Разметка
  return (
    <PopupWithForm
    isOpen={isOpen}
    name={'add-card'}
    title={'Новое место'}
    formName={'popupFormCard'}
    btnName={'Создать'}
    onClose={hendleClose}
    onSubmit={handleSubmit} 
    switchLoader={switchLoader}>
      <input className="popup__input popup__input_data_place" id="place" name="name" type="text" required placeholder="Название"
      minLength="2" maxLength="30" ref={textInputName} />
      <span className="popup__error place-error"></span>
      <input className="popup__input popup__input_data_place-link" id="link" name="link" type="url" required placeholder="Ссылка на картинку" ref={textInputLink} />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  )
}
  
export default AddPlacePopup