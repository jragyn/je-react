// react components
import React from 'react';
// material-ui components
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

export default class _WorkProjects extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="headline" color="primary" align="center" gutterBottom>
              Work Card stuff
            </Typography>
            <Typography variant="body1">
              While at Symetra, I've managed to convert their 
              age-old <a href="https://en.wikipedia.org/wiki/Active_Server_Pages">Classic ASP</a> internal website tool
              into a lovely new ReactJS front-end with ASP .NET Core back-end, with all the original SQL/LINQ querying functionality,
              and more!
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}