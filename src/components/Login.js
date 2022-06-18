import React from 'react';
import {Link} from "react-router-dom";
import Sign from "./Sign";

function Login() {
// Разметка
  return (
    <>
      <Sign
        title={'Вход'}
        // name={'sign-in'}
        // formName={'sign-in'}
        btnName={'Войти'}
      />
    </>
  )
}

export default Login