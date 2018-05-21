import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import OCRimg from '../assets/ocrIcon.png';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function HomeCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" color="primary" align="center" gutterBottom>
            Welcome Home!
          </Typography>
          <Typography variant="caption" color="textSecondary" align="center" gutterBottom>
            The home of my personal stuff and things
          </Typography>
          <Typography variant="body2" color="default" paragraph>
          It is my github dumpster of stuff I've done or made.<br/>
          Mostly it'll just contain my creations/expressions as far as
          coding and such is concerned, like the "clicker" or "sandbox"
          listed under the Games tab on the bottomNav.
          </Typography>
          <Typography variant="body1" color="default" >
            The music is all from OverClocked Remix, feel free to visit
            them by clicking the OCR button below if you enjoy their music.
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="OverClocked ReMix - Video Game Music Community">
            <Button size="large" href="http://ocremix.org" target="_blank">
              <img src={OCRimg} alt="the link for OCremix" />
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  );
}

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeCard);