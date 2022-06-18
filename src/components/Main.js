import React, {useContext} from 'react';
import Card from './Card.js'
import Footer from "./Footer";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Разметка
  return (
    <>
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={currentUser.avatar} alt="фотография профиля" />
          <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="изменить профиль" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить карточку с местом" onClick={onAddPlace}></button>
      </section>
    
      <section className="elements">userCards
        <ul className="elements__list">
        {cards.map((card) => (
        <Card
        key={card._id}
        card={card} 
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        />
        ))}
        </ul>
      </section>
    </main>
      <Footer/>
      </>
  )
}

export default Main