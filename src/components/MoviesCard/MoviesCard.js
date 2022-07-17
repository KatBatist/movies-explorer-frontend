import React from 'react';
import favoritesNoActive from '../../images/btn-favorites-noActive.svg';
import favoritesActive from '../../images/btn-favorites-active.svg';
import favoritesDelete from '../../images/btn-delete-favoritesMovie.svg';
import { convertTime, getImageUrl, getTrailerUrl } from '../../utils/utils';

function MoviesCard({ movie, onSave, onDelete, isSaved, savedForm }) {

  const [movieForRender, setMovie] = React.useState({
    country: movie.country || 'Нет данных',
    director: movie.director || 'Нет данных',
    duration: movie.duration || 0,
    year: movie.year || 'Нет данных',
    description: movie.description || 'Нет данных',
    image: getImageUrl(movie),
    trailerLink: getTrailerUrl(movie),
    nameRU: movie.nameRU || 'Нет данных',
    nameEN: movie.nameEN || 'Нет данных',
    movieId: movie.id,
    thumbnail: getImageUrl(movie)
  });

  function handleSaveMovie() {
    onSave(movieForRender)
  }

  function handleDeleteMovie() {
    onDelete(movie);
  }

  return (
    <div id={movieForRender.movieId} className="movies-card">
      <div className="movies-card__header">
        <div>
          <h2 className="movies-card__title">{movieForRender.nameRU || movieForRender.nameEN}</h2>
          <p className="movies-card__subtitle">{convertTime(movieForRender.duration)}</p>
        </div>
        {savedForm
          ? (<button className="movies-card__btn-favorites-delete" onClick={handleDeleteMovie}>
              <img src={favoritesDelete} alt="Иконка для удаления фильма из избранного." />
            </button>)
          : (isSaved)
            ? (<button className="movies-card__btn-favorites movies-card__btn-favorites_active"
                onClick={handleDeleteMovie}>
                <img src={favoritesActive} alt="Иконка для удаления фильма из избранного." />
              </button>)
            : (<button className="movies-card__btn-favorites" onClick={handleSaveMovie}>
                <img src={favoritesNoActive} alt="Иконка для добавления фильма в избранное." />
              </button>)
        }
      </div>
      <a  href={movieForRender.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          alt={movieForRender.nameRU || movieForRender.nameEN}
          src={movieForRender.image}
        />
      </a>
    </div>
  )
}

export default MoviesCard;
