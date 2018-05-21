import React from 'react';
// material-ui components
  import PropTypes from 'prop-types';
  import { withStyles } from '@material-ui/core/styles';
  import Typography from '@material-ui/core/Typography';
  import Card from '@material-ui/core/Card';
  import CardContent from '@material-ui/core/CardContent';
  import CardActions from '@material-ui/core/CardActions';
  import Button from '@material-ui/core/Button';

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

function _PersonalProjects(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" color="primary" align="center" gutterBottom>
            Personal Card stuff
          </Typography>
          <Typography variant="subheading" color="default" >
            Stuff about raw JS canvas games i made.
          </Typography>
          <Typography variant="caption" color="default" >
            Currently, the way my original games were designed in HTML5 and vanilla JS,
            porting is a WIP. Due: soon(tm).
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" color="secondary" href="http://jje.surge.sh" target="_blank">My Original Site</Button>
        </CardActions>
      </Card>
    </div>
  );
}

_PersonalProjects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(_PersonalProjects);