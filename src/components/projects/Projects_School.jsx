// react components
import React from 'react';
// material-ui components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// personal components
import GitLookup from './gitloader/GitLookup';

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

export default class _SchoolProjects extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="headline" color="primary" align="center" gutterBottom>
              School Card stuff
            </Typography>
          </CardContent>
        </Card>
        <GitLookup />
      </div>
    );
  }
}