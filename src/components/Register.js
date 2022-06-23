import React, {useState} from 'react';
import Sign from "./Sign";
import auth from "../utils/Auth";
import { Link, withRouter } from 'react-router-dom';

function Register({onChangeEmail, onChangePassword, onSubmit}) {

// Разметка
  return (
    <>
      <Sign
        title={'Регистрация'}
        name={'sign-up'}
        // formName={'sign-up'}
        btnName={'Зарегестрироваться'}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSubmit={onSubmit}
      />
      <div className="sign__redirection">
        <p className="sign__text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="sign__link">Войти</Link>
      </div>
    </>
  )
}

export default withRouter(Register);