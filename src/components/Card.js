import React from "react"

function Card({card, onCardClick}) {

function handleClick() {
  onCardClick(card);}  

  return (
    <li className="elements__card card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/> 
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2> 
        <div className="card__container">
          <button className="card__like-button" type="button"></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button className="card__remove-button" type="button"></button>
    </li>
  )
}
  
export default Card