import React from 'react';
import { Input, Divider } from 'antd';

export default function NewFilmItem(props) {
  const { getData } = props;

  const onChangeValueHandler = (event) => {
    if (event.key === 'Enter') {
      console.log('a');
      const inputValue = event.target.value;
      getData(inputValue);
    }
  };

  return (
    <>
      <Divider />
      <Input
        style={{ width: 500, fontSize: 18, alignSelf: 'center' }}
        className="header__input"
        onKeyDown={onChangeValueHandler}
        allowClear
      />
      <Divider />
    </>
  );
}
