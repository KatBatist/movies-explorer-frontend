import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies({moviesData, onSaveMovie, onDeleteMovie, onSubmit}) {

  let location = useLocation();

  function handleSubmit(data) {
    onSubmit(data);
  }

  return (
    <div>
      <SearchForm
        onSubmit={handleSubmit}
      />
      <MoviesCardList
        data={moviesData}
        pathname={location.pathname}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </div>
  )
}

export default Movies;
