import React from 'react';
import axios from 'axios';
import PrimaryHeader from './PrimaryHeader.jsx';

class PetOwnerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PrimaryHeader />
        <div>
          <h1>Pet Owner PROFILE</h1>
          <p>{props.username}</p>
          <img src={props.image}></img>
          <SearchResults />
        </div>
      </div>
    );
  }
};

export default PetOwnerProfile;
