import { MOVIE_API_URL, HEADERS } from "../constants/constants";

class MoviesApi {
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

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
  };
};

const moviesApi = new MoviesApi({
  baseUrl: MOVIE_API_URL,
  headers: HEADERS
});

export default moviesApi;
