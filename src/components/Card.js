import React from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardDelete, onCardLike}) {

// Подписываемся на контекст CurrentUserContext
const currentUser = React.useContext(CurrentUserContext);

// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `${isOwn ? 'card__remove-button' : 'card__remove-button_hidden'}`
); 

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
  `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button_off'}` 
);

//Функции которые были проброшены из App через Main
function handleClick() {
  onCardClick(card);
}  

function handleDelete() {
    onCardDelete(card);
}  

function handleLike() {
  onCardLike(card);
}  
 
//Разметка
  return (
    <li className="elements__card card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/> 
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2> 
        <div className="card__container">
          <button className={cardLikeButtonClassName} onClick={handleLike} type="button"></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}></button>
    </li>
  )
}
  
export default Card