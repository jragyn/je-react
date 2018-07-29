// react components
import React from 'react';
// material-ui components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// personal components
import OCRimg from '../assets/ocrIcon.png';

const styles = {
  card: {
    minWidth: 275,
  },
};

export default class HomeCard extends React.Component {

  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="display1" color="primary" align="center" gutterBottom>
              Welcome to the JE Webworks!
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center" gutterBottom>
              The home of my code and such.
            </Typography>
            <Typography variant="body2" color="default" paragraph>
            I cannot call this a portfolio, but this does contain a variety of my works.<br/>
            Things such the end results of my projects in various coding classes I've done
            will show up here.<br/>
            </Typography>
            <Divider /><br/>
            <Typography variant="body1" color="default" paragraph>
            Use the navigation at the bottom of the page to peruse around and see what I'm
            talking about.<br/>
            <b>About</b> will have more details about me and my recent jobs.<br/>
            <b>Projects</b> will have a few things I've turned in in my classes, and personal projects.<br/>
            <b>RMMV</b> will have the link to my github repo for my RMMV project, and also my custom plugins I've made.
            </Typography>
            <Divider /><br/>
            <Typography variant="body1" color="default" >
              The music is mostly from OverClocked Remix, feel free to visit
              them by clicking the OCR button below if you enjoy their music.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" href="http://ocremix.org" target="_blank">
              <img src={OCRimg} alt="the link for OCremix" />
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}