import React from 'react';
// material-ui components
  import PropTypes from 'prop-types';
  import { withStyles } from '@material-ui/core/styles';
  import Card from '@material-ui/core/Card';
  import CardContent from '@material-ui/core/CardContent';
  import Typography from '@material-ui/core/Typography';
  import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  import VGIcon from '@material-ui/icons/VideogameAsset';
  import SchoolIcon from '@material-ui/icons/School';
  import WorkIcon from '@material-ui/icons/Work';

// my own components
  import Personal from './Projects_Personal';
  import School from './Projects_School';
  import Work from './Projects_Work';

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
            Here you can find links to various projects I've done on my own time,
            for school, or for work.
          </Typography>
        </CardContent>
      </Card>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<VGIcon />}>
          <Typography>Personal Stuff, like games or tools</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Personal />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<SchoolIcon />}>
          <Typography>School stuff, like class projects</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <School />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<WorkIcon />}>
          <Typography>Work stuff, like contributions I've made</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Work />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      

    </div>
  );
}

ProjectsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectsCard);