// react components
import React from 'react';
// material-ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MusicIcon from '@material-ui/icons/LibraryMusic';
// personal components
import ReactAudioPlayer from 'react-audio-player';
import logo from '../../assets/logo.svg';
import '../../styles/Header.css';

const options = [
  'SMW2: Plastic Smile',
  'MP: Intense Color',
  'SM64: Fleeting Ecstacy',
  'Geom: Endless Challenge',
];

export default class HeaderBar extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      selectedIndex: 1,
      currentSong: "smw2_PlasticSmile.mp3",
    };
  }

  handleClose = () => { this.setState({ anchorEl: null }); };

  handleMenu = event => { this.setState({ anchorEl: event.currentTarget }); };
  
  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    this.changeSong(index);
  };

  changeSong = (index) => {
    var src = options[index];
    switch (src) {
      case "SMW2: Plastic Smile":
        this.setState({currentSong: "smw2_PlasticSmile.mp3"});
        break;
      case "MP: Intense Color":
        this.setState({currentSong: "mp_IntenseColor.mp3"});
        break;
      case "SM64: Fleeting Ecstacy": 
        this.setState({currentSong: "sm64_FleetingEcstasy.mp3"});
        break;
      case "Geom: Endless Challenge": 
        this.setState({currentSong: "geom_Endless.mp3"});
        break;
      default: break;
    }
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
          <img src={logo} className="App-logo" alt="logo"  />
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>JE Webworks</Typography>
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
            <ReactAudioPlayer
              src={require('../../assets/music/' + this.state.currentSong)} 
              controls 
              controlsList="nodownload"
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}