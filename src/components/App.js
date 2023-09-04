/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RateGenreContext from '../rate-context';

import OnlineStatus from './OnlineStatus';
import TabsMovie from './Tabs/Tabs';
import MoviePagination from './Pagination/Pagination';

const apiKey = '56bb73f63d2fd4fad2216060b06eb589';

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showRated, setShowRated] = useState(false);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('A');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        'https://api.themoviedb.org/3/authentication/guest_session/new',
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmJiNzNmNjNkMmZkNGZhZDIyMTYwNjBiMDZlYjU4OSIsInN1YiI6IjY0ZTQ3MmUyNTk0Yzk0MDEzOWM2YTgyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ixtQwXaqeqitTYWucWeprDwUUHXFOofgg44AJtd8ng',
          },
        }
      );
      response = await response.json();
      setSessionId(response.guest_session_id);
    };
    fetchData();
  }, []);
  const changePage = (pg) => {
    setPage(pg);
  };
  const getData = useCallback(
    async (val = value) => {
      setLoading(true);
      setValue(val);
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${val}&page=${page}&include_adult=false`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
          }
        );
        response = await response.json();
        setMovies(response.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [page, value]
  );
  const getGenres = useCallback(async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );
      response = await response.json();
      setGenres(response.genres);
    } catch (err) {
      setError(err);
    }
  }, []);
  const getRated = useCallback(async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=1&sort_by=created_at.asc`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );
      response = await response.json();
      setRatedMovies(response.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);
  const changeList = (key) => {
    if (key === '2') {
      setShowRated(true);
    } else setShowRated(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [page, getData, value]);
  useEffect(() => {
    const fetchData = async () => {
      await getGenres();
    };
    fetchData();
  }, [getGenres]);
  useEffect(() => {
    if (sessionId && showRated) {
      const fetchData = async () => {
        await getRated();
      };
      fetchData();
    }
  }, [showRated, sessionId, page, getRated]);

  const contextValue = useMemo(
    () => ({
      sessionId,
      apiKey,
      genres,
    }),
    [sessionId, genres]
  );
  return (
    <RateGenreContext.Provider value={contextValue}>
      <div
        className="App"
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#F7F7F7',
        }}
      >
        <div
          className="wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60%',
          }}
        >
          <OnlineStatus />
          <main
            className="main"
            style={{
              width: '100%',
            }}
          >
            <TabsMovie
              getData={(val) => getData(val)}
              changeList={(key) => changeList(key)}
              movies={movies}
              error={error}
              loading={loading}
              ratedMovies={ratedMovies}
            />
          </main>
          <footer>
            <MoviePagination changePage={changePage} />
          </footer>
        </div>
      </div>
    </RateGenreContext.Provider>
  );
}
