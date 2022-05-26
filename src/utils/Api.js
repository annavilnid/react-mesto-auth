class Api {
  constructor(config) {
    this._url = config.url
    this._headers = config.headers
  }

  getCardsApi() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponseApi)
  }


  getUserInfoApi() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponseApi)
  }

  _checkResponseApi(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }


  getDataApi() {
    return Promise.all([this.getCardsApi(), this.getUserInfoApi()])
  }

  setUserInfoApi(userData) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkResponseApi)
  }

  addNewCardApi(cardData) {
    return fetch(this._url + '/cards', {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        }),
      })
      .then(this._checkResponseApi)
  }

  deleteCardApi(id) {
    return fetch(this._url + `/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponseApi)
  }

  likeApi(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponseApi)
  }

  dislikeApi(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponseApi)
  }

  setUserAvatarApi(data) {
    return fetch(this._url + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponseApi)
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '95c10f81-6e99-4f87-9fcd-42df77e6047a',
    'Content-Type': 'application/json'
  }
});

export default api;