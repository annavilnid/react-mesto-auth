import React, {useState} from 'react';
import Sign from "./Sign";
import { Link, withRouter } from 'react-router-dom';

function Register({onChangeEmail, onChangePassword, onSubmit}) {

// Разметка
  return (
    <>
      <Sign
        title={'Регистрация'}
        name={'sign-up'}
        // formName={'sign-up'}
        btnName={'Зарегистрироваться'}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSubmit={onSubmit}
      />
      <div className="popup__redirection">
        <p className="popup__text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="popup__link">Войти</Link>
      </div>
    </>
  )
}

export default withRouter(Register);