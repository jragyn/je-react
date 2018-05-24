import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import ProfileImage from './About_ProfileImage';
import Skills from './About_Skills';

const styles = {
  card: {
    minWidth: 275,
  },
};

function AboutCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
        <Typography variant="display2" color="primary" align="center" gutterBottom>
            Who is JE?
        </Typography>
        <ProfileImage />
        <Typography variant="caption" align="center" gutterBottom>
          Jeremy Espinoza, born and raised in the Greater Seattle Area.
        </Typography>
        <Typography variant="subheading" align="center">
          <Button 
            href="https://www.bellevuecollege.edu/programs/degrees/bachelor/ist/ad/" 
            target="_blank">
              Current student at Bellevue College.
          </Button>
        </Typography>
        <Typography variant="subheading" align="center">
          Aspiring Web Developer or Software Engineer.
        </Typography>
        <Typography variant="subheading" align="center">
          A gamer at heart.
        </Typography>
        <Skills />
        </CardContent>

      </Card>
    </div>
  );
}

AboutCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutCard);