import { MAIN_API_URL, HEADERS } from "../constants/constants";

class MainApi {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
        .then((data) => {
          return { data, status: res.status }
        })
      : Promise.reject(`Ошибка: ${res.status}`);
  }

  registration(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    })
    .then(this._checkResponse);
  }

  authorization(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }

  updateCurrentUserProfile(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then(this._checkResponse)
  };

  saveMovie(data, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    .then(this._checkResponse)
  };

  getSavedMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  };

  deleteSavedMovie(id, token) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  };
};

 const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: HEADERS
})

export default mainApi;
