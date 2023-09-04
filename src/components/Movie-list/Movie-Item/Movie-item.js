import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Alert } from 'antd';
import { format } from 'date-fns';

import useErrorCatch from '../../useErrorCatch';
import RateGenreContext from '../../../rate-context';
import Loader from '../Loader/Loader';

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
  const [isLoading, setIsLoading] = useState(true);

  const cutTitle = (text, maxSymb = 50) => {
    if (text.length < maxSymb) {
      return text;
    }
    const substring = text.substring(0, maxSymb - 1);
    return `${substring.slice(0, substring.lastIndexOf(' '))}...`;
  };
  // функция сокращения описания
  const cutOverview = (text, maxSymb = 121) => {
    if (text.length < maxSymb) {
      return text;
    }
    const substring = text.substring(0, maxSymb - 1);
    return `${substring.slice(0, substring.lastIndexOf(' '))}...`;
  };

  // форматирование даты
  const formattedDate = date
    ? format(new Date(date), 'MMMM dd, yyyy', { locale: enGB })
    : 'Unknown date';

  const { Text, Title } = Typography;
  const ctx = useContext(RateGenreContext);

  // эффект айди в имена жанров
  useEffect(() => {
    const ids = genreIds;
    let res = ctx.genres.filter((item) => ids.includes(item.id));
    res = res.map((item) => item.name);
    setGenresNames(res);
  }, [ctx.genres, genreIds, setGenresNames]);

  // функция загрузки картинок
  const getImage = useCallback(
    async (idMovie) => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    },
    [errorHandler]
  );

  // Загрузка картинок эффект
  useEffect(() => {
    if (isLoading) {
      getImage(id);
    }
  }, [getImage, id, isLoading]);

  return (
    <li className="movie-list__item">
      <Card
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'space-between',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row style={{ height: '100%' }}>
          <Col
            xs={0}
            sm={0}
            md={8}
            lg={8}
            xl={8}
            style={{ height: '100%', textAlign: 'center' }}
          >
            <div className="movie-list__image--big">
              {' '}
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Alert
                  type="error"
                  message="Error loading poster"
                  style={{
                    fontSize: 20,
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <img alt="" height="100%" width="100%" src={imagePath} />
              )}
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={16}
            lg={16}
            xl={16}
            style={{
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <div className="movie-list__info">
              <div className="movie-list__top">
                <div className="movie-list__image--small">
                  {isLoading ? (
                    <Loader />
                  ) : error ? (
                    <Alert
                      className="movie-list__alert-small"
                      type="error"
                      message="Error loading poster"
                      style={{
                        fontSize: 20,
                        display: 'inline-block',
                        width: '80px',
                        height: '120px',
                      }}
                    />
                  ) : (
                    <img alt="" height="120px" width="80px" src={imagePath} />
                  )}
                </div>
                <div className="info-header">
                  <div className="info-header__top">
                    <Title
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {cutTitle(title)}
                    </Title>
                    <Score score={score} />
                  </div>
                  <div className="info-header__bottom">
                    <Text className="movie-list__date">{formattedDate}</Text>
                    <ul className="movie-list__tags">
                      {genresNames.map((name) => (
                        <MovieTag genreName={name} key={name} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="movie-list__bottom"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {' '}
                <Text>{cutOverview(overview)}</Text>
                <Rating movieId={id} newRating={rating} />
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </li>
  );
}
