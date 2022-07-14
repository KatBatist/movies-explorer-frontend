import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { filterMoviesAll} from '../../utils/utils';

function Movies({ isLoading, movies, savedMovies, onSearch, onSave, onDelete }) {

  const [searchInput, setSearchInput] = React.useState(localStorage.getItem('searchInput') || '');
  const [searchCheckbox, setSearchCheckbox] = React.useState(JSON.parse(localStorage.getItem('searchCheckbox')) === true);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isMoviesEmpty, setIsMoviesEmpty] = React.useState(false);

  React.useEffect(() => {
    setFilteredMovies(filterMoviesAll(movies, searchInput, searchCheckbox));
  }, [movies]);

  React.useEffect(() => {
    localStorage.setItem('searchCheckbox', JSON.stringify(searchCheckbox));
    setFilteredMovies(filterMoviesAll(movies, searchInput, searchCheckbox));
  }, [searchCheckbox]);

  const handleChangeInput = (value) => {
    setSearchInput(value);
  };

  const handleChangeCheckbox = (value) => {
    setSearchCheckbox(value);
  };

  const handleSearch = () => {
    localStorage.setItem('searchInput', searchInput);
    localStorage.setItem('searchCheckbox', JSON.stringify(searchCheckbox));
    onSearch();
    setFilteredMovies(filterMoviesAll(movies, searchInput, searchCheckbox));
    setIsMoviesEmpty(true);
  };

  return (
    <>
    <SearchForm
        defaultInput={searchInput}
        defaultCheckbox={searchCheckbox}
        onChangeInput={handleChangeInput}
        onChangeCheckbox={handleChangeCheckbox}
        onSearch={handleSearch}
      />
      {isLoading
        ? <Preloader />
        : (<MoviesCardList
            movies={filteredMovies}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
            savedForm={false}
            isMoviesEmpty={isMoviesEmpty}
          />)
      }
    </>
  )
}

export default Movies;

