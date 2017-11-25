import React from 'react';
import PrimaryHeader from './PrimaryHeader.jsx';

const Review = (props) => {
  return (
    <div>
      <PrimaryHeader />
      <div>
        <p>{props.rating}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default Review;
