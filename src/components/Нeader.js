import React, {useState} from 'react';
import headerLogo from '../images/header-logo.svg';
import {Link, useLocation} from 'react-router-dom';
import {useMediaQuery} from "react-responsive";

function Header({loggedOut, loggedIn, email}) {
  const location = useLocation();
  const mobile = useMediaQuery({query: "(max-width: 930px)"});
  const burgerMarkup = <button className={"header__menu"} onClick={() => handlerBurgerMenuOff()}></button>;
  const switchButton = <button className="header__close-button" onClick={handlerBurgerMenuOn}></button>;;
  const logoutMarkup = <div className="header__container"><p className="header__email">{email}</p><button className="header__logout-button" onClick={loggedOut}>Выйти</button></div>

  // Хуки, управляющие внутренним состоянием.
  const [burgerMenu, setBurgerMenu] = useState(burgerMarkup)
  const [switchBurgerMenu, setSwitchBurgerMenu] = useState(true)

  // Включение и отключение бургерного меню
  function handlerBurgerMenuOff() {
    setBurgerMenu(switchButton)
    setSwitchBurgerMenu(false)
  }

  function handlerBurgerMenuOn() {
    setBurgerMenu(burgerMarkup)
    setSwitchBurgerMenu(true)
  }

  // Функция возвращающая основную разметку в завизимости от условий
  function handleMainPartHeader() {
    if (location.pathname === '/sign-up') {
      return <Link className="header__link" to="/sign-in">Войти</Link>
    } else if (location.pathname === '/sign-in') {
      return <Link className="header__link" to="/sign-up">Регистрация</Link>
    } else if (!mobile && loggedIn === true) {
      return logoutMarkup
    } else if (mobile && loggedIn === true) {
      return burgerMenu
    }
  }

  // Функция добовляющая блок сверху в завизимости от условий
  function handleCeilingPartHeader() {
    if (mobile && switchBurgerMenu === false && location.pathname === '/') {
      return logoutMarkup
    }
  }

// Разметка
  return (
    <header className="header">
      {handleCeilingPartHeader()}
      <img className="header__logo" src={headerLogo} alt="логотип Место"/>
      {handleMainPartHeader()}
    </header>
  )
}

export default Header