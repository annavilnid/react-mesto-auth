import React from "react"

// Разметка
function Sign({title, btnName, formName, onChangeEmail, onChangePassword, onSubmit, name}) {
  return (
      <main className="popup popup_theme_dark">
        <div className="popup__container popup__container_theme_dark">
        <h2 className="popup__title popup__title_theme_dark">{title}</h2>
        <form className="popup__form" name={name} name={formName} noValidate onSubmit={onSubmit}>
          <input className="popup__input popup__input_theme_dark" name={`name-${name}`} type="text" required placeholder="Email" minLength="2" maxLength="40" onChange={onChangeEmail}/>
          <span className="popup__error"></span>
          <input className="popup__input popup__input_theme_dark" name={`about-${name}`} type="password" required placeholder="Пароль" minLength="2" maxLength="200" onChange={onChangePassword} autoComplete="on"/>
          <span className="popup__error"></span>
          <button className="popup__save-button popup__save-button_theme_dark" type="submit" >{btnName}</button>
        </form>
        </div>
      </main>
  )
}

export default Sign;