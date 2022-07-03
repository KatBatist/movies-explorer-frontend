import React from 'react';
import { Route, Switch, useHistory,} from 'react-router-dom';
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
import initialMovies from '../../constants/initialMovies';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [moviesData, setMoviesData] = React.useState([]);
  const [savedMoviesData, setSavedMoviesData] = React.useState([]);
  const [regStatus, setRegStatus] = React.useState(null);
  const [authStatus, setAuthStatus] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(null);
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [like, setLike] = React.useState(false);

  const history = useHistory();

  function handleRegistration(data) {
    setRegStatus(200);
    handleAuthorization({
      name: data.name,
      email: data.email,
      password: data.password
    },);
  }

  function handleAuthorization(data) {
    setAuthStatus(200)
    setLoggedIn(true);
    setCurrentUser(data);
    history.push('/movies');
  }

  function handleSignOut (evt) {
    evt.preventDefault();
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  };

  function handleUpdateCurrenUser(data) {
    setCurrentUser(data);
    setUserStatus(200);
    history.goBack();
  };

  function handleSearchMovies ()  {

  };

  function handleSaveMovie(data) {
    initialMovies.forEach((movie) => {
      if (movie._id === data._id) {
        movie.isSave = 1;
      }
    })
    setLike(!like);
  };

  function handleDeleteMovie(data) {
    initialMovies.forEach((movie) => {
      if (movie._id === data._id) {
        movie.isSave = 0;
      }
    })
    setLike(!like);
  }

  React.useEffect(() => {
    setMoviesData(initialMovies);
    const initialSavedMovies = [];
    initialMovies.forEach((movie) => {
      if (movie.isSave === 1) {
        initialSavedMovies.push(movie);
      }
    });
    setSavedMoviesData(initialSavedMovies);
  }, [like])

  function handleResize() {
    handleCloseMenu();
  }

  function handleOpenMenu() {
    setMenuIsOpen(true);
    window.addEventListener('resize', handleResize);
  };

  function handleCloseMenu() {
    setMenuIsOpen(false);
    window.removeEventListener('resize', handleResize);
  };

  return (
    <div className="App">
      <Switch>
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
        <Route path="/profile">
          <Header
            loggedIn={loggedIn}
            onOpenMenu={handleOpenMenu}
          />
          <Profile
            onUpdateCurrentUser={handleUpdateCurrenUser}
            onSignOut={handleSignOut}
            userStatus={userStatus}
            currentUser={currentUser}
          />
        </Route>
        <Route path="/movies">
          <Header
            loggedIn={loggedIn}
            onOpenMenu={handleOpenMenu}
          />
          <Movies
            moviesData={moviesData}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            onSubmit={handleSearchMovies}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header
            loggedIn={loggedIn}
            onOpenMenu={handleOpenMenu}
          />
          <SavedMovies
            savedMoviesData={savedMoviesData}
            onDeleteMovie={handleDeleteMovie}
          />
          <Footer />
        </Route>
        <Route exact path="/">
          <Header
            loggedIn={loggedIn}
            onOpenMenu={handleOpenMenu}
          />
          <Main />
          <Footer />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {menuIsOpen && (
        <Menu
          isOpen={menuIsOpen}
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
}

export default App;
