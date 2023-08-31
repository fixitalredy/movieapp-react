/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import OnlineStatus from './OnlineStatus';
import MovieList from './Movie-list/Movie-list';
import NewFilmItem from './New-film-form/New-film-form';

// api key - 56bb73f63d2fd4fad2216060b06eb589

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getData = async (value = 'A') => {
    setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmJiNzNmNjNkMmZkNGZhZDIyMTYwNjBiMDZlYjU4OSIsInN1YiI6IjY0ZTQ3MmUyNTk0Yzk0MDEzOWM2YTgyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ixtQwXaqeqitTYWucWeprDwUUHXFOofgg44AJtd8ng',
      },
    };
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
        options
      );
      response = await response.json();
      setMovies(response.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="wrapper" style={{ textAlign: 'center' }}>
        <OnlineStatus />
        <header className="header">
          <NewFilmItem getData={(value) => getData(value)} />
        </header>
        <main className="container">
          <div
            className="content"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MovieList
              getData={getData}
              movies={movies}
              status={loading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
