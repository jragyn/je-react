// react components
import React from 'react';
// material-ui components
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// personal components
import WeatherUI from './WeatherCard';

// basic styling for material-ui card.
const styling = {
  card: {
    marginBottom: 10,
    maxWidth: 500,
  }
}


// elastic IP for my AWS-housed nodeJS express app.
const uri = 'http://52.42.202.204:1337';

export default class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      loc: {
        latitude: 47.6,
        longitude: 122.3,
      },
      canLocate: false,
      results: {
        general: null,
        icon: "02d.png",
        currentTemp: null,
        humidity: null,
        cloudiness: null,
        raininess: null,
        snowiness: null,
        wind: null,
        sunrise: null,
        sunset: null,
        lat: null,
        lon: null,
        city: null,
      },
    }
  }

  componentDidMount() {
    this.setState({
      timer: setTimeout(this.getLocation, 1500),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  getLocation = () => {
    let self = this;
    var startPos;
    var geoSuccess = function(position) {
      startPos = position;
      self.setState({
        loc: {
          latitude: startPos.coords.latitude,
          longitude: startPos.coords.longitude,
        },
        canLocate: true,
      });
    };
    var geoError = function(error) {
      let details = "";
      switch (error.code) {
        case 0: details = "who knows what happened?"; break;
        case 1: details = "the user denied the permissions."; break;
        case 2: details = "browser can't find the user's location!"; break;
        case 3: details = "timed out while trying to fetch location."; break;
        default: details = "idk."; break;
      }
      console.log(details);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }

  getWeather = () => {
    let self = this;
    let data = { lat: this.state.loc.latitude, lon: this.state.loc.longitude };
    let settings = {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(data),
    };
    console.log(data);
    fetch(uri + '/w/now', settings).then((x) => x.json()).then((res) => {
      self.setState({ results: {
        general: res.weather[0].description,
        icon: res.weather[0].icon + ".png",
        currentTemp: res.main.temp,
        humidity: res.main.humidity,
        cloudiness: res.clouds.all,
        //raininess: res.rain.3h,
        //snowiness: res.snow.3h,
        wind: res.wind.speed,
        sunrise: res.sys.sunrise,
        sunset: res.sys.sunset,
        lat: res.coord.lat,
        lon: res.coord.lon,
        city: res.name,
      }});
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <div>
        <Card style={styling.card}>
          <CardContent>
            <Typography variant="headline">
              Wanna get the weather?
            </Typography>
            <Typography variant="caption">
              The button won't be enabled if location services aren't active!
            </Typography>
            <Divider />
            <WeatherUI {...this.state.results}/>
            <Divider />
          </CardContent>
          <CardActions>
            <Button variant="outlined" onClick={this.getWeather} disabled={!this.state.canLocate}>
              Local Weather
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }//render

}//component