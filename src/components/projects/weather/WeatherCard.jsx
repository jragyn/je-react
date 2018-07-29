// react components
import React from 'react';
// material-ui components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudinessIcon from '@material-ui/icons/FilterDrama';  // for cloudiness
import HumidityIcon from '@material-ui/icons/BubbleChart';    // for humidity
import WindIcon from '@material-ui/icons/Toys';               // for wind
import SunriseIcon from '@material-ui/icons/Looks';           // for sunrise
import SunsetIcon from '@material-ui/icons/RoomService';      // for sunset
import CityIcon from '@material-ui/icons/Place';              // for city
import LatLonIcon from '@material-ui/icons/MyLocation';       // for latitude / longitude
import DetailsIcon from '@material-ui/icons/More';            // for latitude / longitude
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
// personal components
import './spin.css';

// basic styling for material-ui card.
const styling = {
  card: {
    margin: 20,
  }
}

export default class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      general: "not yet loaded.",
      icon: "02d.png",
      currentTemp: null,
      humidity: null,
      cloudiness: null,
      wind: null,
      sunrise: 0,
      sunset: 0,
      lat: 0,
      lon: 0,
      city: "",
    }
  }
  
  // passes props from manager to UI component.
  static getDerivedStateFromProps(props, state) {
    return {
      general: props.general,
      icon: props.icon,
      currentTemp: props.currentTemp, // unit-sensitive
      humidity: props.humidity,
      cloudiness: props.cloudiness,
      wind: props.wind,       // unit-sensitive
      sunrise: props.sunrise, // time
      sunset: props.sunset,   // time
      lat: props.lat,
      lon: props.lon,
      city: props.city,
    }
  }

  // used for making a human-readable time string out of unix time.
  makeTime = (oldTime) => {
    var d = new Date(oldTime*1000);
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var formattedTime = hours + ':' + minutes;
    return formattedTime;
  }

  // handles the expand/contract of the Weather Details.
  handleClick = () => { this.setState(state => ({ open: !state.open })); };

  render() {
    return (
      <div>
        <Card style={styling.card}>
          <CardContent>
            <img src={"http://openweathermap.org/img/w/" + this.state.icon} 
                 className="spin-me" 
                 alt="the weather icon"
            />
            <Typography variant="headline" color="primary">
              Temperature (in fahrenheit):
            </Typography>
            <Typography variant="display4" color="default">
              {this.state.currentTemp}
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <CityIcon />
                </ListItemIcon>
                <ListItemText primary={this.state.city} secondary={this.state.general} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LatLonIcon />
                </ListItemIcon>
                <ListItemText primary="Latitude, Longitude" secondary={this.state.lat + ", " + this.state.lon} />
              </ListItem>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <DetailsIcon />
                </ListItemIcon>
                <ListItemText primary="Weather Details" color="secondary" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button>
                    <ListItemIcon>
                      <CloudinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cloud Cover %:" secondary={this.state.cloudiness} />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <HumidityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Humidity %" secondary={this.state.humidity} />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <WindIcon />
                    </ListItemIcon>
                    <ListItemText primary="Wind Speed" secondary={this.state.wind} />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <SunriseIcon />
                    </ListItemIcon>
                    <ListItemText primary="Time of Sunrise:" secondary={this.makeTime(this.state.sunrise)} />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <SunsetIcon />
                    </ListItemIcon>
                    <ListItemText primary="Time of Sunset:" secondary={this.makeTime(this.state.sunset)} />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }//render

}//component