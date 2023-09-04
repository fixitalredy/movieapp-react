import React from 'react';
import { Alert } from 'antd';

import Loader from './Loader/Loader';
import MovieItem from './Movie-Item/Movie-item';

export default function MovieList(props) {
  const { movies, status, error } = props;
  if (error) {
    return (
      <Alert
        type="error"
        message={`Ошибка ${error.message}`}
        style={{
          fontSize: 20,
          display: 'inline-block',
        }}
        showIcon
      >
        No available movies
      </Alert>
    );
  }
  if (status) {
    return <Loader />;
  }
  return (
    <ul className="movie-list">
      {movies.map((item) => (
        <MovieItem
          key={item.id}
          id={item.id}
          title={item.title}
          overview={item.overview}
          date={item.release_date}
          rating={item.rating}
          score={item.vote_average}
          genreIds={item.genre_ids}
        />
      ))}
    </ul>
  );
}
