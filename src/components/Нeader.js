import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link, useLocation }  from 'react-router-dom';
import MediaQuery from "react-responsive"

function Header() {

  const location = useLocation();


  function getName() {
    if (location.pathname === '/sign-up') {
      return <Link className="header__link" to="/sign-in">Войти</Link>
    } else if (location.pathname === '/sign-in') {
      //return <Link className="header__link" to="/sign-up">Регистрация</Link>
      return (
        <MediaQuery query=(min-width: 1024px)>
    <img className="header__logo" src={headerLogo} alt="логотип Место" />
        </MediaQuery>
    )
    }
  }



// Разметка
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип Место" />
      {getName()}
    </header>
  )
}

export default Header