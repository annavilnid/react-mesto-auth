import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link, useLocation }  from 'react-router-dom';
//import {useMediaQuery} from "react-responsive";

function Header({loggedOut, email}) {

  const location = useLocation();
  //const phone =  useMediaQuery("(max-width:600px)");


  function getName() {
    if (location.pathname === '/sign-up') {
      return <Link className="header__link" to="/sign-in">Войти</Link>
    } else if (location.pathname === '/sign-in') {
      return <Link className="header__link" to="/sign-up">Регистрация</Link>
    } else {
      return (
      <>
        <span className="header__link">{email}</span><button className="header__link" onClick={loggedOut}>Выйти</button>
      </>
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