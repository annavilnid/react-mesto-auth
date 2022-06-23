class Auth {
  constructor(config) {
    this._BASE_URL = config.url;
    this._headers = config.headers;
  }

  _checkResponseAuth(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  register(dataPassword, dataEmail) {
    return fetch(`${this._BASE_URL}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: dataPassword,
        email: dataEmail
      })
    })
      .then(this._checkResponseAuth)
      // .then((response) => {
      //   console.log(response.jwt)
      //   try {
      //     if (response.status === 200) {
      //       return response.json();
      //     }
      //   } catch (e) {
      //     return (e)
      //   }
      // })
      // .then((res) => {
      //   console.log(res)
      //   return res;
      // })
      // .catch((err) => console.log(err));
  };

  authorize(dataPassword, dataEmail) {
  return fetch(`${this._BASE_URL}/signin`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      password: dataPassword,
      email: dataEmail
    })
  })
    .then(this._checkResponseAuth)
};

  checkToken(JWT) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${JWT}`
      }
    })
      .then(this._checkResponseAuth)
  };
}

  const auth = new Auth({
    url: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });



export default auth;