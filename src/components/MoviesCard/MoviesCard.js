import React from 'react';

import favoritesNoActive from '../../images/btn-favorites-noActive.svg';
import favoritesActive from '../../images/btn-favorites-active.svg';
import favoritesDdelete from '../../images/btn-delete-favoritesMovie.svg';

function MoviesCard({data, pathname, onSaveMovie, onDeleteMovie}) {

  const convertTime = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hours}ч ${minutes}м`;
  }

  function handleLike() {
    onSaveMovie(data)
  }

  function handleLikeActive() {
    onDeleteMovie(data)
  }

  function handleLikeDelete() {
    onDeleteMovie(data)
  }

  return (
    <div id={data._id} className="movies-card">
      <div className="movies-card__header">
        <div>
          <h2 className="movies-card__title">{data.nameRU}</h2>
          <p className="movies-card__subtitle">{convertTime(data.duration)}</p>
        </div>
        {pathname === '/saved-movies'
          ? (<button className="movies-card__btn-favorites-delete" onClick={handleLikeDelete}>
              <img src={favoritesDdelete} alt="Иконка для удаления фильма из избранного." />
            </button>)
          : (pathname === '/movies' && data.isSave === 1)
            ? (<button className="movies-card__btn-favorites movies-card__btn-favorites_active" onClick={handleLikeActive}>
                <img src={favoritesActive} alt="Иконка для добавления фильма в избранное." />
              </button>)
            : (<button className="movies-card__btn-favorites" onClick={handleLike}>
                <img src={favoritesNoActive} alt="Иконка для удаления фильма из избранного." />
              </button>)
        }
      </div>
      <a  href={data.trailer} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          alt={data.nameRU}
          src={data.image}
        />
      </a>
    </div>
  )
}

export default MoviesCard;
