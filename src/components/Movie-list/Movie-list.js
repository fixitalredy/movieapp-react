import React from 'react';
import { Alert } from 'antd';

import Loader from '../Loader';

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
    <ul
      style={{
        listStyleType: 'none',
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '18px',
        flex: '1',
        alignItems: 'center',
        paddingLeft: '0px',
        maxWidth: '1000px',
      }}
    >
      {movies.map((item) => (
        <MovieItem
          key={item.id}
          id={item.id}
          title={item.title}
          overview={item.overview}
          date={item.release_date}
          rating={item.rating}
        />
      ))}
    </ul>
  );
}
