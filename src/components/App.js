import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Нeader';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  // Хуки, управляющие внутренним состоянием.
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpe] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deleteCard, setDeleteCard] = useState({});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([ ]);
  const [loader, setLoader] = useState(false);
  // Выключение кнопки для валидации
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  function handeleButtonDisabled() {
    setIsButtonDisabled(true)
  }

  function handeleButtonEnabled() {
    setIsButtonDisabled(false)
  }
 
  // Получение данных при первичном открытии страницы
  useEffect(() => {
    api.getDataApi()
     .then(([cardsData, userData]) => {
       setCurrentUser(userData); 
       setCards(cardsData); 
     })
     .catch(err => {
        console.log(err);
     })
   }, []);

  // Функции переключающие состояние при открытии попапов.
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpe(true)
  }
    
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  // Функция переключающая состояние при клике на карточку
  function handleCardClick(card) {
    setSelectedCard(card);
  };
  
  // Функция переключающая состояние при удалении карточки
  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true)
    setDeleteCard(card);
    };

  // Функция переключающия состояние при закртытии попапов.
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpe(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({})
    }
  
  // Обработчик изменения информации о пользователе
  function handleUpdateUser(newUserData) {
    setLoader(true)
    api.setUserInfoApi(newUserData)
      .then((newUserData) => {
        setCurrentUser(newUserData); 
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoader(false))
  }
  
  // Обработчик изменения аватара
  function handleUpdateAvatar(newUserAvatar) {
    setLoader(true)
    api.setUserAvatarApi(newUserAvatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar); 
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoader(false))
  }

  //____________Регистрация и Авторизация
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleRegistration(e){
    e.preventDefault()
    console.log('Нам бы зарегестрироваться')
    console.log(email);
    console.log(password);
    auth.register(password, email)
      .then((resData) => {
        if (resData) {
          history.push("/sign-in");
          setEmail('')
          setPassword('')
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleAutarization(e){
    e.preventDefault()
    console.log('Нам бы залогиниться')
    console.log(email);
    console.log(password);
    auth.authorize(password, email)
      .then((autData) => {
        if (autData) {
          console.log(autData);
          setLoggedIn(true);
          history.push('/');
          setEmail('')
          setPassword('')
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }
  //______________


  // Обработчик добавления новой карточки
  function handleAddPlace(newCard) {
    setLoader(true)
    api.addNewCardApi(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoader(false))
  }

  // Функция отвечающая за удаление и добавления лайка
  function handleCardLike(card) {
  // Проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  if (!isLiked) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeApi(card._id)
      .then((newCard) => { 
        setCards((state) => state.map((c) => 
        c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.dislikeApi(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => 
        c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      })
  }
} 

  //Функция отвечающая за удаление карточки
  const handleConfirmDelete = () => { 
    api.deleteCardApi(deleteCard._id)
      .then(() => {
        //используя методы массива, создаем новый массив карточек newCards, где не будет карточки, которую мы только что удалили */
        const newCards = cards.filter(i => i._id !== deleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Разметка
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardDelete={handleCardDeleteClick}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-up">
            <Register
              onChangeEmail={handleChangeEmail}
              onChangePassword={handleChangePassword}
              onSubmit={handleRegistration}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onChangeEmail={handleChangeEmail}
              onChangePassword={handleChangePassword}
              onSubmit={handleAutarization}
            />
          </Route>
          {/*  <Route exact path="/sign-up" component={withRouter(Register)} />*/}
          {/*  <Route exact path="/sign-in" component={withRouter(Login)} />*/}
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          switchLoader={loader}
          buttonDisabled={isButtonDisabled}
          onButtonDisabled={handeleButtonDisabled}
          onButtonEnabled={handeleButtonEnabled}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          switchLoader={loader}/>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
          switchLoader={loader}/>
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleConfirmDelete}/>
        <ImagePopup
          name={'zoom-card'}
          card={selectedCard}
          onClose={closeAllPopups}/>
        <InfoTooltip
          name={'sign-in'}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isloggedIn={loggedIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;