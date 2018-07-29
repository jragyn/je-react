// react components
import React from 'react';
// material-ui components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import VGIcon from '@material-ui/icons/VideogameAsset';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
// personal components
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

export default class ProjectsCard extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="display1" color="primary" align="center">
              Projects and stuff I've worked on
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center" gutterBottom>
              Expand the corresponding Panels to see the details of each section.
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

}