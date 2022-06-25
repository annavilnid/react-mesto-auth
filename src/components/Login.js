import React from 'react';
import {Link} from "react-router-dom";
import Sign from "./Sign";

function Login({onChangeEmail, onChangePassword, onSubmit}) {
// Разметка
  return (
    <Sign
      title={'Вход'}
      name={'sign-in'}
      formName={'sign-in'}
      btnName={'Войти'}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
    />
  )
}

export default Login