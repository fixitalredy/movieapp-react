import React from 'react';
import { Tabs } from 'antd';

import NewFilmItem from '../New-film-form/New-film-form';
import MovieList from '../Movie-list/Movie-list';
import MoviePagination from '../Pagination/Pagination';

export default function TabsMovie({
  ratedMovies,
  changeList,
  getData,
  movies,
  error,
  loading,
  changePageRatedMovies,
  changePageMovies,
  page,
  ratedPage,
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
          <MoviePagination
            changePage={changePageMovies}
            movies={movies}
            page={page}
          />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <MovieList movies={ratedMovies} status={loading} error={error} />
          <MoviePagination
            changePage={changePageRatedMovies}
            movies={ratedMovies}
            page={ratedPage}
          />
        </div>
      ),
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={changeTab}
      items={items}
      centered
      style={{ backgroundColor: 'white' }}
    />
  );
}
