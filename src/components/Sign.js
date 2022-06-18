import React from "react"
import { withRouter } from 'react-router-dom';

let test = console.log('нажали');
// Разметка
function Sign({title, btnName, onChangeEmail, onChangePassword, onSubmit, name}) {
  return (
      <main className="sign__container">
        <h2 className="sign__title">{title}</h2>
        <form className="sign__form sign__form_action_up" name={name} noValidate onSubmit={onSubmit}>
          <input className="sign__input sign__input_data_email" id="name" name="name" type="text" required placeholder="Email"
                 minLength="2" maxLength="40" onChange={onChangeEmail}/>
          <input className="sign__input sign__input_data_password" id="about" name="about" type="text" required placeholder="Пароль"
                 minLength="2" maxLength="200" onChange={onChangePassword}/>
          <button className="sign__save-button" type="submit" >{btnName}</button>
        </form>
      </main>
  )
}

export default withRouter(Sign);