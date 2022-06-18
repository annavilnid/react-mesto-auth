import React, {useState} from 'react';
import Sign from "./Sign";
import auth from "../utils/Auth";
import { Link, withRouter } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log('Нам бы зарегестрироваться')
    console.log(email);
    console.log(password);
    auth.register(password, email);

  }


// Разметка
  return (
    <>
      <Sign
        title={'Регистрация'}
        name={'sign-up'}
        // formName={'sign-up'}
        btnName={'Зарегестрироваться'}
        onChangeEmail={handleChangeEmail}
        onChangePassword={handleChangePassword}
        onSubmit={handleSubmit}
      />
      <div className="sign__redirection">
        <p className="sign__text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="sign__link">Войти</Link>
      </div>
    </>
  )
}

export default withRouter(Register);