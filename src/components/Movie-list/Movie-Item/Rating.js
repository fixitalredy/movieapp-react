/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Rate } from 'antd';

import RateContext from '../../../rate-context';

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export default function Rating({ movieId, newRating }) {
  const { sessionId, apiKey } = useContext(RateContext);

  const rateHandler = async (value) => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}&api_key=${apiKey}`,
      {
        ...options,
        body: JSON.stringify({
          value,
        }),
      }
    );
    response = await response.json();
  };

  return <Rate allowHalf count={10} onChange={rateHandler} value={newRating} />;
}
