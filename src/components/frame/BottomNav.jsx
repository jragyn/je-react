import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AboutIcon from '@material-ui/icons/HelpOutline';
import DevIcon from '@material-ui/icons/DeveloperMode';
import VGIcon from '@material-ui/icons/VideogameAsset';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
  },
};

class BottomNav extends React.Component {
  state = {
    value: "",
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <Tooltip title="Home" placement="top">
          <BottomNavigationAction component={Link} to="/je-react/" label="Home" icon={<HomeIcon />} />
        </Tooltip>
        <Tooltip title="About" placement="top">
          <BottomNavigationAction component={Link} to="/je-react/About" label="About" icon={<AboutIcon />} />
        </Tooltip>
        <Tooltip title="Projects" placement="top">
          <BottomNavigationAction component={Link} to="/je-react/Projects" label="Projects" icon={<DevIcon />} />
        </Tooltip>
        <Tooltip title="RMMV" placement="top">
          <BottomNavigationAction component={Link} to="/je-react/Rmmv" label="RMMV" icon={<VGIcon />} />
        </Tooltip>
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);