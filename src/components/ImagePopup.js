import React from "react"

function ImagePopup({name, card, onClose}) {

// Разметка
  return(
    <div className={`popup popup_type_${name} ${card.name && 'popup_is-opened'}`}>
      <div className="popup__wrapper">
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={onClose}></button>
        <figure className="popup__figure">
           <img  className="popup__image" src={card.link} alt={card.name}/> 
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}
  
export default ImagePopup