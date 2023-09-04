import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Alert } from 'antd';
import { format } from 'date-fns';

import useErrorCatch from '../../useErrorCatch';
import RateGenreContext from '../../../rate-context';

import Rating from './Rating';
import Score from './Score';
import MovieTag from './MovieTag';

export default function MovieItem({
  title,
  date,
  overview,
  id,
  rating,
  score,
  genreIds,
}) {
  const { enGB } = format;
  const [imagePath, setImagePath] = useState();
  const { error, errorHandler } = useErrorCatch();
  const [genresNames, setGenresNames] = useState([]);
  const cutOverview = (text, maxSymb = 121) => {
    if (text.length < maxSymb) {
      return text;
    }
    const substring = text.substring(0, maxSymb - 1);
    return `${substring.slice(0, substring.lastIndexOf(' '))}...`;
  };
  const formattedDate =
    date === ''
      ? 'unknown date'
      : format(new Date(date), 'MMMM dd, yyyy', {
          locale: enGB,
        });
  const { Text, Title } = Typography;

  const ctx = useContext(RateGenreContext);

  useEffect(() => {
    const ids = genreIds;
    let res = ctx.genres.filter((item) => ids.includes(item.id));
    res = res.map((item) => item.name);
    setGenresNames(res);
  }, [ctx.genres, genreIds, setGenresNames]);
  const getImage = useCallback(
    async (idMovie) => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmJiNzNmNjNkMmZkNGZhZDIyMTYwNjBiMDZlYjU4OSIsInN1YiI6IjY0ZTQ3MmUyNTk0Yzk0MDEzOWM2YTgyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ixtQwXaqeqitTYWucWeprDwUUHXFOofgg44AJtd8ng',
          },
        };
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${idMovie}/images`,
          options
        );
        response = await response.json();
        setImagePath(
          `https://image.tmdb.org/t/p/original${response.posters[0].file_path}`
        );
      } catch (err) {
        errorHandler(err);
      }
    },
    [errorHandler]
  );
  useEffect(() => {
    getImage(id);
  }, [getImage, id]);
  return (
    <li
      className="movie-list__item"
      style={{
        maxWidth: '491px',
      }}
    >
      <Card
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '246',
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Row
          style={{
            height: '100%',
          }}
        >
          <Col
            span={8}
            style={{
              height: '100%',
            }}
          >
            {error ? (
              <Alert
                type="error"
                message="Ошибка при загрузке постера"
                style={{
                  fontSize: 20,
                  display: 'inline-block',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <img alt="moviepic" height="100%" width="100%" src={imagePath} />
            )}
          </Col>
          <Col span={16} style={{ padding: '20px' }}>
            <div
              className="movie-list__info"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div
                className="header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {' '}
                <Title
                  style={{
                    fontSize: 20,
                  }}
                >
                  {title}
                </Title>
                <Score score={score} />
              </div>

              <Text className="movie-list__date">{formattedDate}</Text>
              <ul className="movie-list__tags">
                {genresNames.map((name) => (
                  <MovieTag genreName={name} />
                ))}
              </ul>

              <Text
                style={{
                  marginBottom: '20px',
                }}
              >
                {cutOverview(overview)}
              </Text>
              <Rating movieId={id} newRating={rating} />
            </div>
          </Col>
        </Row>
      </Card>
    </li>
  );
}
