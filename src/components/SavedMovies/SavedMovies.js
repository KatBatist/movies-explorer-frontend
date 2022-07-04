import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({loggedIn, savedMoviesData, onDeleteMovie}) {

  const handleSubmit = (data) => {

  }

  let location = useLocation();

  return (
    <main>
      <SearchForm
        onSubmit={handleSubmit}
      />
      <MoviesCardList
        data={savedMoviesData}
        pathname={location.pathname}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  )
}

export default SavedMovies;
