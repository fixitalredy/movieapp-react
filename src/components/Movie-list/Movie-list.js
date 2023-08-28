import React from 'react';
import { List, Typography } from 'antd';

import MovieItem from './Movie-Item/Movie-item';

export default function MovieList(props) {
  const { Text } = Typography;
  const { movies } = props;
  if (movies.length === 0) {
    return (
      <Text
        style={{
          fontSize: 20,
        }}
      >
        No available movies
      </Text>
    );
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <List
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
