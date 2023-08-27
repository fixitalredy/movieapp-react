import React from 'react';

import MovieItem from './Movie-Item/Movie-item';

export default function MovieList(props) {
  const { movies } = props;
  if (movies.length === 0) {
    return <p>No available movies</p>;
  }
  const elements = movies.map((movie) => <MovieItem title={movie.title} />);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <ul className="content__movie-list movie-list">{elements}</ul>
  );
}
