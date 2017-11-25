import React from 'react'
import AppBar from 'material-ui/AppBar';
import Axios from 'axios';
import IconButton from 'material-ui/IconButton';
import RustyIcon from './RustyIcon.jsx'
import FlatButton from 'material-ui/FlatButton';

function handleTouchTap() {
  Axios.get('/')
    .then((response) =>
      console.log('TITLE CLICK:', response)
    )
    .catch((error) =>
      console.log('TITLE CLICK ERROR:', error)
    )
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const PrimaryHeader = ({ onLogOut }) => (
  <AppBar
    title={<span style={styles.title}>RUSTY</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementLeft={<IconButton></IconButton>}
    iconElementRight={<FlatButton label="log out" onClick={onLogOut} />}
  />
);

export default PrimaryHeader;