import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
            Welcome to the Home Page
          </Typography>
          <Typography variant="body2" color="default" >
          It is my github dumpster of stuff I've done or made.
          Mostly it'll just contain my creations/expressions as far as
          coding and such is concerned, like the "clicker" or "sandbox"
          seen in the NAV. Use the NAV on the right to play around with
          either of the games. They will run side-by-side, even while not
          open so you can go freely between them.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeCard);