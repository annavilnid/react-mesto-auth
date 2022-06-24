import React, {useState, useCallback, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Нeader';
import Main from './Main';
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
  const history = useHistory();
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
  // Регистрация и Авторизация
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Выключение кнопки для валидации
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Проверка залогинен или зарегистрирован ли пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [registreted, setRegistreted] = useState(false);
  // Проверка токена
  const [userEmail, setUserEmail] = React.useState('');

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

  //Функции отключения кнопки в попапах
  function handleButtonDisabled() {
    setIsButtonDisabled(true)
  }

  function handleButtonEnabled() {
    setIsButtonDisabled(false)
  }

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

  // Инпуты при регистрации или авторизации
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  // Регистрация
  function handleRegistration(e){
    e.preventDefault()
    auth.register(password, email)
      .then((resData) => {
        if (resData) {
          history.push("/sign-in");
          setEmail('')
          setPassword('')
          setRegistreted(true)
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  // Авторизация
  function handleAuthorization(e){
    e.preventDefault()
    auth.authorize(password, email)
      .then((autData) => {
        if (autData) {
          setUserEmail(email)
          localStorage.setItem('jwt', autData.token);
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

  // Выход из системы
  function logout() {
    setLoggedIn(false);
    // удаляем jwt из хранилища
    localStorage.removeItem('jwt');
    setUserEmail('')
    setPassword('')
    history.push('/sign-in');
  }

  // проверяем по jwt был ли залогинен пользователь
  const handleCheckToken = useCallback(
    () => {
      const token = localStorage.getItem('jwt');
      auth.checkToken(token)
        .then(
          (userData) => {
            setUserEmail(userData.data.email)
            setLoggedIn(true);
            history.push('/');
          },
          (err) => {
            console.log(err);
          }
        )
    },
    [],
  )

  // пользователь зашел, нужно проверить с помощью jwt залогинен ли он
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleCheckToken();
    }
  }, [])

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
          loggedOut={logout}
          loggedIn={loggedIn}
          email={userEmail}
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
          <Route
            exact path="/sign-up">
            <Register
              onChangeEmail={handleChangeEmail}
              onChangePassword={handleChangePassword}
              onSubmit={handleRegistration}
            />
          </Route>
          <Route
            exact path="/sign-in">
            <Login
              onChangeEmail={handleChangeEmail}
              onChangePassword={handleChangePassword}
              onSubmit={handleAuthorization}
            />
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          switchLoader={loader}
          buttonDisabled={isButtonDisabled}
          onButtonDisabled={handleButtonDisabled}
          onButtonEnabled={handleButtonEnabled}
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
          isRegistreted={registreted}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;