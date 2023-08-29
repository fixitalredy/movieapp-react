import React from 'react';
import { Input, Divider } from 'antd';

export default function NewFilmItem(props) {
  const { getData } = props;

  const onChangeValueHandler = (event) => {
    const inputValue = event.target.value;
    getData(inputValue);
  };
  const debounce = (fn, ms) => {
    let timeout;
    return function (...args) {
      const fnCall = () => {
        fn.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };
  return (
    <>
      <Divider />
      <Input
        style={{ width: 500, fontSize: 18, alignSelf: 'center' }}
        className="header__input"
        onChange={debounce(onChangeValueHandler, 1000)}
        allowClear
      />
      <Divider />
    </>
  );
}
