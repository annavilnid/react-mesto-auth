import React, {useRef} from "react"
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, switchLoader}) {
  
  // Реф, доступ к DOM-узлу
  const textInput = useRef('');
  
  // Обработчик формы
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: textInput.current.value,
    });
    textInput.current.value = ''
  } 

  function handleClose() {
    onClose()
    textInput.current.value = ''
  }
  
  // Разметка
  return (
    <PopupWithForm
    isOpen={isOpen}
    name={'edit-avatar'}
    title={'Обновить аватар'}
    formName={'popupFormAvatar'}
    onClose={handleClose}
    switchLoader={switchLoader}
    onSubmit={handleSubmit}>
      <input className="popup__input popup__input_data_about" id="avatar" name="avatar" type="url" required placeholder="Ссылка на картинку" ref={textInput} />
      <span className="popup__error avatar-error"></span> 
    </PopupWithForm>
  )
}
  
export default EditAvatarPopup