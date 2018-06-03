import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const styles = {
  card: {
    minWidth: 275,
    margin: 10,
    padding: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '30%',
    border: '1px solid black'
  },
  innerCard: {
    margin: 10,
    padding: 10,
  }
};

class RmmvCaex extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardMedia 
            image={require('../rmmvShots/caex.png')} 
            title="cover image" 
            style={styles.media}
          />
          <CardContent>
          <Typography variant="headline" color="primary" gutterBottom>
            Chef Adventure! EX, aka CAEX, is a 2D Action-RPG game developed in RPG Maker MV.
          </Typography>
          <Divider />
          <Typography variant="caption" color="secondary" gutterBottom>
              This has been an ongoing project for many years, migrated up from generation to
              generation (RMXP to RMVXace to now RMMV). It is never complete, simply a testing
              ground for concepts/ideas when it comes to game development with an easy access.
            </Typography>
            <Typography variant="subheading" color="default" gutterBottom>
              I have a project called Chef Adventure! EX, aka CAEX. It is by no means complete,
              but I spent a fair amount of time on the scripting, and a have a tiny demo
              available if you want to put in the work and download it.
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

RmmvCaex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RmmvCaex);