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

function ProjectsCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" color="primary" align="center" gutterBottom>
            Projects and stuff I've worked on
          </Typography>
          <Typography variant="body2" color="default" >
            asdf
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

ProjectsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectsCard);