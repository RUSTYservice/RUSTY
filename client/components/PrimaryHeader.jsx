import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Pets from 'material-ui/svg-icons/action/pets';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const PrimaryHeader = (props) => (
  <AppBar
    style={{ backgroundColor: '#7CB342' }}
    title={<span style={styles.title}>RUSTY</span>}
    iconElementLeft={<IconButton><Pets /></IconButton>}
  />
);

export default PrimaryHeader;
