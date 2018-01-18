import React from 'react';

const Review = (props) => {
  return (
    <div>
      <div>
        <p>{props.rating}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Review;
