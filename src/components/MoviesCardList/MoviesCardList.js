import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesMore from '../MoviesMore/MoviesMore';
import useCurrentSize from '../../utils/useCurrentSize';
import Error from '../Error/Error';
import { isSavedMovie } from '../../utils/utils';
import { LARGE_WIDTH, MEDIUM_WIDTH, SMALL_WIDTH,
  LARGE_COUNT_MOVIES, MEDIUM_COUNT_MOVIES, SMALL_COUNT_MOVIES,
  LARGE_ROW_MOVIES, MEDIUM_ROW_MOVIES, SMALL_ROW_MOVIES } from "../../constants/constants";

function MoviesCardList({movies, savedMovies, onSave, onDelete, savedForm, isMoviesEmpty}) {

  const [moviesForRender, setMoviesForRender] = React.useState([]);
  const [countMoviesForRender, setCountMoviesForRender] = React.useState(0);
  const [countMoviesForRow, setCountMoviesForRow] = React.useState(0);
  const [isButtonMore, setIsButtonMore] = React.useState(false);

  const size = useCurrentSize();

  const countMovies = () => {
    if (size.width >= LARGE_WIDTH) {
      setCountMoviesForRender(LARGE_COUNT_MOVIES);
      setCountMoviesForRow(LARGE_ROW_MOVIES);
    } else {
      if (size.width < LARGE_WIDTH && size.width >= MEDIUM_WIDTH) {
        setCountMoviesForRender(MEDIUM_COUNT_MOVIES);
        setCountMoviesForRow(MEDIUM_ROW_MOVIES);
      } else {
        if (size.width < MEDIUM_WIDTH && size.width >= SMALL_WIDTH) {
          setCountMoviesForRender(SMALL_COUNT_MOVIES);
          setCountMoviesForRow(SMALL_ROW_MOVIES);
        };
      };
    };
  };

  const handleMoreClick = () => {
    setMoviesForRender(movies.slice(0, moviesForRender.length + countMoviesForRow));
    if (moviesForRender.length >= movies.length - countMoviesForRow) {
      setIsButtonMore(false);
    }
  }

  React.useEffect(() => {
    countMovies();
  }, [size.width])

  React.useEffect(() => {
    if (savedForm) {
      setMoviesForRender(movies);
      setIsButtonMore(false);
    } else {
      setMoviesForRender(movies.slice(0, countMoviesForRender));
      if (movies.length <= countMoviesForRender) {
        setIsButtonMore(false);
      } else {
        setIsButtonMore(true);
      };
    }
  }, [movies, countMoviesForRender])

  return (
    <>
      <div className={savedForm
        ? "movies-card-list movies-card-list_saved"
        : "movies-card-list"} >
        {moviesForRender.length
          ? (<ul className="movies-card-list__container">
              {moviesForRender.map((item) => (
                <li key={item.id || item._id}>
                  <MoviesCard
                    movie={item}
                    onSave={onSave}
                    onDelete={onDelete}
                    isSaved={isSavedMovie(item, savedMovies)}
                    savedForm={savedForm}
                  />
              </li>))}
            </ul>)
          : (isMoviesEmpty &&
              <Error
                classNameError="error_movies"
                textError="Ничего не найдено"
              />)
        }
      </div>
      {!savedForm && isButtonMore &&
        (<MoviesMore
          onClick={handleMoreClick}
        />)
      }
    </>
  )
}

export default MoviesCardList;

