import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from '../assets/logo.svg';
import '../styles/Header.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function HeaderBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
        <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="title" color="inherit">
            JE Webworks
          </Typography>
        </Toolbar>
      </AppBar>

    </div>
  );
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);