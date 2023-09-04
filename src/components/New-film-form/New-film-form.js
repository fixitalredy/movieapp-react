/* eslint-disable func-names */
import React from 'react';
import { Input, Divider, Alert } from 'antd';

import useErrorCatch from '../useErrorCatch';

export default function NewFilmItem(props) {
  const { getData } = props;
  const { error, errorHandler } = useErrorCatch();
  const onChangeValueHandler = (event) => {
    if (event.target.value) {
      try {
        const inputValue = event.target.value;
        getData(inputValue);
      } catch (err) {
        errorHandler(err);
      }
    }
  };
  const debounce = (fn, ms) => {
    let timeout;
    return function (...args) {
      try {
        const fnCall = () => {
          fn.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
      } catch (err) {
        errorHandler(err);
      }
    };
  };
  return error ? (
    <Alert
      type="error"
      message="Ошибка при загрузке поисковой строки"
      style={{
        fontSize: 20,
        display: 'inline-block',
        width: '100%',
      }}
      showIcon
    >
      No available movies
    </Alert>
  ) : (
    <>
      <Input
        style={{
          width: 500,
          fontSize: 18,
          alignSelf: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
        className="header__input"
        onChange={debounce(onChangeValueHandler, 1000)}
        allowClear
      />
      <Divider />
    </>
  );
}
