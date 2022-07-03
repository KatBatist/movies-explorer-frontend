import React from 'react';

function MoviesMore({onClick}) {

  return (
    <div className="movies-more">
      <button className="movies-more__btn" onClick={onClick}>Ещё</button>
    </div>
  )
}

export default MoviesMore;