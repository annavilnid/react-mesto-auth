import React from 'react';
import Card from './Card.js'
import api from '../utils/Api.js';


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelite}) {
// Хуки, управляющие внутренним состоянием.
const [userAvatar,  setUserAvatar] = React.useState(' ');
const [userName,  setUserName] = React.useState(' ');
const [userDescription,  setUserDescription] = React.useState(' ');
const [userCards, setUserCards] = React.useState([ ]);

// Хуки, при загрузке страницы получаем данные пользователя и карточек
React.useEffect(() => {
  api.getDataApi()
  .then(([cardsData, userData]) => {
    setUserAvatar(userData.avatar); 
    setUserName(userData.name);
    setUserDescription(userData.about);
    setUserCards(cardsData);
   })
  .catch(err => {
  console.log(err);
  })
  }, [])

// Разметка
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={userAvatar} alt="фотография профиля" />
          <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="изменить профиль" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить карточку с местом" onClick={onAddPlace}></button>
      </section>
    
      <section className="elements">
        <ul className="elements__list">
        {userCards.map((card) => <Card
        key={card._id}
        card={card} 
        onCardClick={onCardClick}
        onCardDelite={onCardDelite}
        />)}
        </ul>
      </section> 
    </main>
  )
}

export default Main