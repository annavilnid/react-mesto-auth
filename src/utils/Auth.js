class Auth {
  constructor(config) {
    this._BASE_URL = config.url;
    this._headers = config.headers;
  }

  register(dataPassword, dataEmail) {
    console.log('запустилась региcтрация')
    console.log(`${this._BASE_URL}/signup`)
    console.log(this._headers)
    console.log(JSON.stringify({
      password: dataPassword,
      email: dataEmail
    }))
    return fetch(`${this._BASE_URL}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: dataPassword,
        email: dataEmail
      })
    })
      .then((response) => {
        try {
          if (response.status === 200) {
            return response.json();
          }
        } catch (e) {
          return (e)
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };
}

  const auth = new Auth({
    url: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });


export default auth;