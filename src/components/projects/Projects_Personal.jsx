import React from 'react';
// material-ui components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
// personal components
import Weather from './weather/WeatherManager';
  
const styles = {
  card: {
    marginBottom: 12,
  },
};

export default class _PersonalProjects extends React.Component {

  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="headline" color="primary" align="center" gutterBottom>
              Personal Card stuff
            </Typography>
            <Typography variant="subheading" color="default" >
              Stuff about raw JS canvas games i made.
            </Typography>
            <Typography variant="caption" color="default" >
              My original games were designed in HTML5 and vanilla JS,
              porting is a WIP.
              Due: soon(tm).
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" color="secondary" href="http://jje.surge.sh" target="_blank">My Original Site</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}