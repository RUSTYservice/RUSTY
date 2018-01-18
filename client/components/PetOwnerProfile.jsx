import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import ProfileHeader from './ProfileHeader.jsx';
import SearchResults from './SearchResults.jsx';

const paperStyle = {
  width: 500,
  margin: 10,
  textAlign: 'left',
};


const PetOwnerProfile = (props) => {
  return (
    <MuiThemeProvider>
      <div>
        <ProfileHeader onLogOut={props.onLogOut} />
        <br />
        <Paper
          style={paperStyle}
          zDepth={3}
        >
          <Card>
            <CardHeader
              title={'Welcome back ' + props.user.username + ' and ' + props.user.pet + '!'}
            />
            <img src={props.user.profileImg.cloudinaryURL} style={{ maxWidth: 500 }} alt="" />
            <CardMedia
              overlay={<CardTitle title={props.user.pet} />}
            />
            <CardText>
              <h4>Browse local pet-friendly businesses.
              Whistle for {props.user.pet} and Enjoy!</h4>
            </CardText>
          </Card>
        </Paper>
        <SearchResults petOwnerId={props.user._id} />
      </div>
    </MuiThemeProvider>
  );
};

export default PetOwnerProfile;

