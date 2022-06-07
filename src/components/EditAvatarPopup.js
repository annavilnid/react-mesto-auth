import React, {useRef} from "react"
import PopupWithForm from './PopupWithForm'


// разметка
function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  
  const textInput = useRef('');

   function handleSubmit(e) {
     e.preventDefault();
     console.log(textInput.current.value);
      onUpdateAvatar({
       avatar: textInput.current.value,
      });
      textInput.current.value = ''
    } 

    return (
      <PopupWithForm
      isOpen={isOpen}
      name={'edit-avatar'}
      title={'Обновить аватар'}
      formName={'popupFormAvatar'}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input className="popup__input popup__input_data_about" id="avatar" name="avatar" type="url" required placeholder="Ссылка на картинку" ref={textInput} />
        <span className="popup__error avatar-error"></span> 
      
      </PopupWithForm>
    )
  }
  
export default EditAvatarPopup