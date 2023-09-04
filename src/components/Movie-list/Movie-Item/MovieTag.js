import React from 'react';
import { Tag } from 'antd';

export default function MovieTag({ genreName }) {
  return <Tag className="movie-list__tag">{genreName}</Tag>;
}
