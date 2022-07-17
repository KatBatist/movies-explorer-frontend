import { SHORT_MOVIE_DURATION, MOVIE_API_BASE_URL } from "../constants/constants";

export  const filterMoviesAll = (movies, searchInput, searchCheck) => {
  if (!searchInput) return [];

  let filterData = [];
  const filterKeyword = (movie) => {
    return JSON.stringify(movie).toLowerCase().includes(searchInput.toLowerCase())
  }
  filterData = movies.filter(filterKeyword);

  if(searchCheck) {
    filterData = filterData.filter((item) => item.duration < SHORT_MOVIE_DURATION);
  }

  return filterData;
};

export const isSavedMovie = (movie, savedMovies) => savedMovies.some((item) => item.id === movie.id);

export const convertTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);
  return `${hours}ч ${minutes}м`;
}

const isUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

export const getImageUrl = (data) => {
  if (isUrl(data.image)) {
    return data.image;
  }
  return `${MOVIE_API_BASE_URL}${data.image.url}`;
};

export const getTrailerUrl = (data) => {
  if (isUrl(data.trailerLink)) {
    return data.trailerLink;
  } else {
    return `https://www.youtube.com`;
  }
};
