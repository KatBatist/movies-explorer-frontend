import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMoviesAll } from '../../utils/utils';

function SavedMovies({ movies, onDelete }) {

  const [searchInput, setSearchInput] = React.useState('');
  const [searchCheckbox, setSearchCheckbox] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isMoviesEmpty, setIsMoviesEmpty] = React.useState(false);

  React.useEffect(() => {
    setFilteredMovies(filterMoviesAll(movies, searchInput, searchCheckbox));
  }, [movies]);

  React.useEffect(() => {
    setFilteredMovies(filterMoviesAll(movies, searchInput, searchCheckbox));
  }, [searchCheckbox]);

  const handleChangeInput = (value) => {
    setSearchInput(value);
  };

  const handleChangeCheckbox = (value) => {
    setSearchCheckbox(value);
  };

  const handleSearch = () => {
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
      <MoviesCardList
        movies={filteredMovies}
        savedMovies={movies}
        onDelete={onDelete}
        savedForm={true}
        isMoviesEmpty={isMoviesEmpty}
      />
    </>
  )
}

export default SavedMovies;
