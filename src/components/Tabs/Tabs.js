import React from 'react';
import { Tabs } from 'antd';

import NewFilmItem from '../New-film-form/New-film-form';
import MovieList from '../Movie-list/Movie-list';

export default function TabsMovie({
  ratedMovies,
  changeList,
  getData,
  movies,
  error,
  loading,
}) {
  const changeTab = (key) => {
    changeList(key);
  };

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <NewFilmItem getData={(value) => getData(value)} />
          <MovieList movies={movies} status={loading} error={error} />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <MovieList movies={ratedMovies} status={loading} error={error} />
      ),
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={changeTab}
      items={items}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    />
  );
}
