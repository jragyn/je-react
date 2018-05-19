import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import VGIcon from '@material-ui/icons/VideogameAsset';
import DevIcon from '@material-ui/icons/DeveloperMode';
import MusicIcon from '@material-ui/icons/LibraryMusic';
import CodeIcon from '@material-ui/icons/Code';

const styles = {
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
  },
};

class BottomNav extends React.Component {
  state = {
    value: "Home",
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log(value);
    
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root} >
        <BottomNavigationAction component={Link} to="/je-react/Home" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to="/je-react/Games" label="Games" icon={<VGIcon />} />
        <BottomNavigationAction component={Link} to="/je-react/Projects" label="Projects" icon={<DevIcon />} />
        <BottomNavigationAction component={Link} to="/je-react/Rmmv" label="RMMV" icon={<CodeIcon />} />
        <BottomNavigationAction component={Link} to="/je-react/Music" label="Music" icon={<MusicIcon />} />
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);