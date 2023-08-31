import React from 'react';
import { List, Alert } from 'antd';

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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <List
      pagination={{
        pageSize: 10,
        total: 50,
        style: {
          textAlign: 'center',
        },
      }}
      grid={{
        gutter: 16,
        column: 2,
      }}
      size="small"
      dataSource={movies}
      renderItem={(item) => (
        <List.Item>
          <MovieItem
            key={item.id}
            title={item.title}
            overview={item.overview}
            date={item.release_date}
          />
        </List.Item>
      )}
      className="content__movie-list movie-list"
      align="middle"
    />
  );
}
