import React, {useState} from 'react';
import headerLogo from '../images/header-logo.svg';
import {Route, Switch, Link} from 'react-router-dom';
import {useMediaQuery} from "react-responsive";

function Header({loggedOut, loggedIn, email}) {
  const mobile = useMediaQuery({query: "(max-width: 930px)"});
  const logoutMarkup = <div className="header__container"><p className="header__email">{email}</p><button className="header__logout-button" onClick={loggedOut}>Выйти</button></div>

  // Хуки, управляющие внутренним состоянием.
  const [burgerMenuButton, setBurgerMenuButton] = useState(true)
  const [closeButton, setCloseButton] = useState(false)

  //Включение и отключение бургерного меню
  function handlerBurgerMenuOff() {
    setBurgerMenuButton(false)
    setCloseButton(true)
  }

  function handlerBurgerMenuOn() {
    setBurgerMenuButton(true)
    setCloseButton(false)
  }

// Разметка
  return (
    <header className="header">

      {(mobile && burgerMenuButton === false && loggedIn === true) && logoutMarkup}

      <img className="header__logo" src={headerLogo} alt="логотип Место"/>

      <Switch>
        <Route exact path='/sign-up'>
          <Link className="header__link" to="/sign-in">Войти</Link>
        </Route>

        <Route exact path='/sign-in'>
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        </Route>
      </Switch>

      {(!mobile && loggedIn === true) && logoutMarkup}

      {(mobile && loggedIn === true && (burgerMenuButton === true)) &&
        <button className={"header__menu"} onClick={handlerBurgerMenuOff}></button>}

      {(mobile && loggedIn === true && closeButton === true) &&
        <button className="header__close-button" onClick={handlerBurgerMenuOn}></button>}

    </header>
  )
}

export default Header