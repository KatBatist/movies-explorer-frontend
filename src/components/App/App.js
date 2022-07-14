import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Menu from '../Menu/Menu';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [regStatus, setRegStatus] = React.useState(null);
  const [authStatus, setAuthStatus] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem('movies')));
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);
  const [textInfoTooltip, setTextInfoTooltip] = React.useState('');
  const [isErrorInfoTooltip, setIsErrorInfoTooltip] = React.useState(false);

  const history = useHistory();

  function handleRegistration(data) {
    mainApi.registration(data)
      .then((res) => {
        setRegStatus(res.status);
        handleAuthorization({
          email: data.email,
          password: data.password
        },);
      })
      .catch((err) => {
        setRegStatus(err);
      })
  }

  const handleCheckToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken(token)
      .then((res) => {
        setAuthStatus(res.status);
        setCurrentUser(res.data.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setAuthStatus(err);
      })
    }
  }

  function handleAuthorization(data) {
    mainApi.authorization(data)
    .then((res) => {
      setAuthStatus(res.status);
      setLoggedIn(true);
      localStorage.setItem('jwt', res.data.token);
      handleCheckToken();
      history.push('/movies');
    })
    .catch((err) => {
      setAuthStatus(err);
    })
  }

  function handleSignOut (evt) {
    evt.preventDefault();
    localStorage.clear()
    setLoggedIn(false);
    history.push('/');
  };

  function handleUpdateCurrenUser(data) {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.updateCurrentUserProfile(data, token)
        .then((res) => {
          setCurrentUser(res.data.data);
          setUserStatus(res.status);
          history.goBack();
          handleOpenInfoTooltip();
          setTextInfoTooltip("Обновление профиля прошло успешно!")
          setIsErrorInfoTooltip(false);
        })
        .catch((err) => {
          setUserStatus(err);
        })
    };
  };

  const handleSearchMovies = () => {
    setIsLoading(true);
    if (movies && movies.length) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    } else {
    moviesApi.getMovies()
      .then((res) => {
        setMovies(res.data)
        localStorage.setItem('movies', JSON.stringify(res.data));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setMovies([]);
        handleOpenInfoTooltip();
        setTextInfoTooltip("Во время запроса произошла ошибка. Возможно, проблема " +
        "с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!")
        setIsErrorInfoTooltip(true);
      });
    }
  };

  const handleSaveMovie = (data) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.saveMovie(data, token)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res.data.data, id: res.data.data.movieId }]);
      })
      .catch((err) => {
        handleOpenInfoTooltip();
        setTextInfoTooltip("Что-то пошло не так...")
        setIsErrorInfoTooltip(true);
      });
    }
    else {
      history.push('/signin');
    };
  };

  const  handleDeleteMovie = (data) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const movieId = savedMovies.find((item) => item.id === data.id)._id;
      mainApi.deleteSavedMovie(movieId, token)
      .then((res) => {
        if (res) {
          setSavedMovies((state) => state.filter((c) => c.movieId !== res.data.data.movieId));
        }
      })
      .catch((err) => {
        handleOpenInfoTooltip();
        setTextInfoTooltip("Что-то пошло не так...")
        setIsErrorInfoTooltip(true);
      });
    } else {
      history.push('/signin');
    };
  };

  function handleCloseMenu() {
    setIsOpenMenu(false);
    window.removeEventListener('resize', handleResize);
  };

  function handleOpenMenu() {
    setIsOpenMenu(true);
    window.addEventListener('resize', handleResize);
  };

  function handleResize() {
    handleCloseMenu();
  }

  function handleOpenInfoTooltip() {
    setIsOpenInfoTooltip(true);
  }

  function handleCloseInfoTooltip() {
    setIsOpenInfoTooltip(false);
    setTextInfoTooltip("");
  }

  React.useEffect(() => {
    if (loggedIn) {
      handleSearchMovies();
    } else {
      setMovies([]);
    }
  }, [loggedIn]);

  React.useEffect(() => {
  const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.getSavedMovies(token)
      .then((res) => {
        const array = res.data.data.map((item) => ({ ...item, id: item.movieId }));
        setSavedMovies(array);
      })
      .catch(() => {
        setSavedMovies([]);
        handleOpenInfoTooltip();
        setTextInfoTooltip("Что-то пошло не так...")
        setIsErrorInfoTooltip(true);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken(token)
      .then((res) => {
        setCurrentUser(res.data.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
      })
    }
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
          <Header
            loggedIn={loggedIn}
            onOpenMenu={handleOpenMenu}
          />
        </Route>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            <Register
              onRegistration={handleRegistration}
              regStatus={regStatus}
            />
          </Route>
          <Route path="/signin">
            <Login
              onAuthorization={handleAuthorization}
              authStatus={authStatus}
            />
          </Route>
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onUpdate={handleUpdateCurrenUser}
            onSignOut={handleSignOut}
            userStatus={userStatus}
          />
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            movies={movies}
            savedMovies={savedMovies}
            onSearch={handleSearchMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            movies={savedMovies}
            onDelete={handleDeleteMovie}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Route exact path={['/', '/movies', '/saved-movies']}>
          <Footer />
        </Route>
        {isOpenMenu &&
          (<Menu
            isOpen={isOpenMenu}
            onClose={handleCloseMenu}
          />)
        }
        {isOpenInfoTooltip &&
          <InfoTooltip
            isOpen={isOpenInfoTooltip}
            onClose={handleCloseInfoTooltip}
            text={textInfoTooltip}
            isError={isErrorInfoTooltip}
          />
        }
      </CurrentUserContext.Provider>
    </div>
  )
}


export default App;
