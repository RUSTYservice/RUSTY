import React from 'react';

const Wag = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Wag;
