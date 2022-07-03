import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesMore from '../MoviesMore/MoviesMore';

function MoviesCardList({data, pathname, onSaveMovie, onDeleteMovie}) {

  const handleMoreClick = () => {

  }

  const moviesCardsList = data.map((item) => (
    <li key={item.id || item._id}>
      <MoviesCard
        data={item}
        pathname={pathname}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}/>
    </li>
  ))


  return (
    <>
    <div className={pathname === '/movies'
      ? "movies-card-list"
      : "movies-card-list movies-card-list_saved"} >
      <ul className="movies-card-list__container">
        {moviesCardsList}
      </ul>

    </div>
    {pathname === '/movies' &&
      <MoviesMore
        onClick={handleMoreClick}
      />}
    </>
  )
}

export default MoviesCardList;
