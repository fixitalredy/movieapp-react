import React from 'react';

export default function NewFilmItem(props) {
  const { getData } = props;

  const onChangeValueHandler = (event) => {
    if (event.key === 'Enter') {
      console.log('a');
      const inputValue = event.target.value;
      getData(inputValue);
    }
  };

  return <input className="header__input" onKeyDown={onChangeValueHandler} />;
}
