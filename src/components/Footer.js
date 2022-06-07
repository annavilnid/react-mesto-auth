import React from "react"

// Функция возвращающая актуальную дату
function getCurrentYear() {
  return new Date().getFullYear();
   };

// Разметка
function Footer() {
    return (
      <footer className="footer">
        <p className="footer__info" lang="en">&copy; {getCurrentYear()} Mesto Russia</p>
      </footer>
    )
  }
  
export default Footer