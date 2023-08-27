/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function MovieItem() {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [tag, setTag] = useState();
  return (
    <li className="movie-list__item">
      <img
        className="movie-list__image"
        alt="moviepic"
        src="https://news.store.rambler.ru/img/7222d314d8abaf270be4e5b51a2c80ef?img-format=auto&img-1-resize=height:350,fit:max&img-2-filter=sharpen"
      />
      <div className="movie-list__info">
        <h1 className="movie-list__name">{title}</h1>
        <p className="movie-list__date">{date}</p>
        <ul className="movie-list__tags">
          <li className="movie-list__tag">{tag}</li>
        </ul>
        <p className="movie-list__description">{description}</p>
      </div>
    </li>
  );
}
