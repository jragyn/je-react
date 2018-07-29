// react components
import React from 'react';
// material-ui components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {
  card: {
    minWidth: 275,
    padding: 5,
  },
  media: {
    height: 0,
    paddingTop: '30%',
    border: '1px solid black'
  },
};

export default class RmmvCaex extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardMedia 
            image={require('../../rmmvShots/caex.png')} 
            title="cover image" 
            style={styles.media}
          />
          <CardContent>
          <Typography variant="headline" color="primary" gutterBottom>
            Chef Adventure! EX, aka CAEX, is a 2D Action-RPG game developed in RPG Maker MV.
          </Typography>
          <Divider /><br/>
          <Typography variant="subheading" color="default" gutterBottom>
              This has been an ongoing project for many years, migrated up from generation to
              generation (RMXP to RMVXace to now RMMV). It is never complete, simply a testing
              ground for concepts/ideas when it comes to game development with an easy access.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="raised" color="primary" href="https://github.com/jragyn/CAEX" target="_blank">
              Click here to checkout the CAEX github repo
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}