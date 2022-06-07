import React, {useContext} from 'react';
//import React, {useState, useEffect, useContext} from 'react';
import Card from './Card.js'
//import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

// Подписываемся на контекст CurrentUserContext
const currentUser = useContext(CurrentUserContext);

// // Хуки, при загрузке страницы получаем данные пользователя и карточек
// useEffect(() => {
//   api.getDataApi()
//   .then(([cardsData, userData]) => {
//     setCards(cardsData);
//    })
//   .catch(err => {
//   console.log(err);
//   })
//   }, [])

// // функция отвечающая за удаление и добавления лайка
// function handleCardLike(card) {
//   // Снова проверяем, есть ли уже лайк на этой карточке
//   const isLiked = card.likes.some(i => i._id === currentUser._id);
//   if (!isLiked) {
//     // Отправляем запрос в API и получаем обновлённые данные карточки
//     api.likeApi(card._id, !isLiked).then((newCard) => {
//       setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
//     });
//   } else {
//     // Отправляем запрос в API и получаем обновлённые данные карточки
//     api.dislikeApi(card._id, isLiked).then((newCard) => {
//       setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
//     });
//   }
// } 

// //функция отвечающая за удаление карточки
// const handleCardDelete = (card) => {
//   api.deleteCardApi(card._id).then(() => {
//       // используя методы массива, создаем новый массив карточек newCards, где не будет карточки, которую мы только что удалили */
//       const newCards = cards.filter(i => i._id !== card._id);
//       setCards(newCards);
//   });
// }

  // Хуки, управляющие внутренним состоянием.
//const [userAvatar, setUserAvatar] = useState(' ');
//const [userName, setUserName] = useState(' ');
//const [userDescription, setUserDescription] = useState(' ');
//const [userCards, setUserCards] = useState([ ]);

// Хуки, при загрузке страницы получаем данные пользователя и карточек
// useEffect(() => {
//   api.getDataApi()
//   .then(([cardsData, userData]) => {
//     setCards(cardsData);
//    })
//   .catch(err => {
//   console.log(err);
//   })
//   }, [])

// Разметка
  return (
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
        //onCardDelete={onCardDelete}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        />
        ))}
        </ul>
      </section>
    </main>
  )
}

export default Main