import React from 'react';
import { Pagination } from 'antd';

export default function MoviePagination({ changePage, movies, page }) {
  const paginationHandler = (chosenPage) => {
    changePage(chosenPage);
  };
  if (movies.length < 20 && page === 1) {
    return null;
  }
  return (
    <>
      <Pagination defaultCurrent={1} total={50} onChange={paginationHandler} />{' '}
    </>
  );
}
