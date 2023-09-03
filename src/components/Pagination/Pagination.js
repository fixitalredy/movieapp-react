import React from 'react';
import { Pagination } from 'antd';

export default function MoviePagination({ changePage }) {
  const paginationHandler = (page) => {
    changePage(page);
  };
  return (
    <>
      <Pagination defaultCurrent={1} total={50} onChange={paginationHandler} />{' '}
    </>
  );
}
