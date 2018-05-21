import React from 'react';
// material-ui components
  import PropTypes from 'prop-types';
  import { withStyles } from '@material-ui/core/styles';
  import Card from '@material-ui/core/Card';
  import CardContent from '@material-ui/core/CardContent';
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

function _WorkProjects(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" color="primary" align="center" gutterBottom>
            Work Card stuff
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

_WorkProjects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(_WorkProjects);