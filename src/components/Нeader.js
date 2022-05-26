import React from 'react';
import headerLogo from '../images/header-logo.svg';

function Header() {
// Разметка
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип Место" /> 
    </header>
  )
}

export default Header