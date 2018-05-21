import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MusicIcon from '@material-ui/icons/LibraryMusic';

import logo from '../assets/logo.svg';
import '../styles/Header.css';
import ReactAudioPlayer from 'react-audio-player';

const options = [
  'SMW2: Plastic Smile',
  'MP: Intense Color',
  'SM64: Fleeting Ecstacy',
];

class HeaderBar extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 1,
    currentSong: "/media/smw2_PlasticSmile.mp3",
  };

  handleClose = () => { this.setState({ anchorEl: null }); };

  handleMenu = event => { this.setState({ anchorEl: event.currentTarget }); };
  
  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    console.log(index);
    this.changeSong(index);
  };


  changeSong = (index) => {
    var src = options[index];
    switch (src) {
      case "SMW2: Plastic Smile": this.setState({currentSong: "/media/smw2_PlasticSmile.mp3"}); break;
      case "MP: Intense Color": this.setState({currentSong: "/media/mp_IntenseColor.mp3"}); break;
      case "SM64: Fleeting Ecstacy": this.setState({currentSong: "/media/sm64_FleetingEcstasy.mp3"}); break;
      default: break;
    }
    console.log(this.state.currentSong);
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
          <img src={logo} className="App-logo" alt="logo"  />
            <Typography variant="title" color="inherit">
              JE Webworks
            </Typography>  
          </Toolbar>
          <Toolbar>
            <IconButton
              onClick={this.handleMenu}
              color="inherit"
            >
              <MusicIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
            </Menu>
            <ReactAudioPlayer src={this.state.currentSong} controls controlsList="nodownload"/>
          </Toolbar>
        </AppBar>
  
      </div>
    );
  }
}

export default HeaderBar;