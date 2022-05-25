import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js'

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
// Хуки, управляющие внутренним состоянием.
const [userData, setUserData] = React.useState(' ')
const [userCards, setUserCards] = React.useState([ ])

//при загрузке страницы получаем данные пользователя
// React.useEffect(() => {
//   api.getUserInfoApi()
//   .then(userData => {
//    console.log(userData)
//    setUserData(userData); 
//    })
//   .catch(err => {
//   console.log(err);
//   })
//   }, [])

//при загрузке страницы получаем данные карточек
//  React.useEffect(() => {
//    api.getCardsApi()
//    .then(cardsData => {
//    console.log(cardsData)
//    setUserCards(cardsData)
//    })
// .catch(err => {
// console.log(err);
// })
// },[])

//при загрузке страницы получаем данные пользователя и карточек
React.useEffect(() => {
  api.getDataApi()
  .then(([cardsData, userData]) => {
   console.log(userData)
   console.log(cardsData)
   setUserData(userData); 
   setUserCards(cardsData)
   })
  .catch(err => {
  console.log(err);
  })
  }, [])
  
  return (
    <main>
    <section className="profile">
      <div className="profile__avatar-wrapper">
        <img className="profile__avatar" src={userData.avatar} alt="фотография профиля" />
        <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
      </div>
      <div className="profile__info">
        <h1 className="profile__title">{userData.name}</h1>
        <button className="profile__edit-button" type="button" aria-label="изменить профиль" onClick={onEditProfile}></button>
        <p className="profile__subtitle">{userData.about}</p>
      </div>
      <button className="profile__add-button" type="button" aria-label="добавить карточку с местом" onClick={onAddPlace}></button>
    </section>
    
    <section className="elements">
      <ul className="elements__list">
      {userCards.map((card) => <Card
      key={card._id}
      card={card} 
      onCardClick={onCardClick}/>)
      }
      </ul>
      </section> 
  </main>
  )
}

export default Main