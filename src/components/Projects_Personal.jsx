import React from 'react';
import ReactDOM from 'react-dom';

// material-ui components
  import PropTypes from 'prop-types';
  import { withStyles } from '@material-ui/core/styles';
  import Typography from '@material-ui/core/Typography';
  import Card from '@material-ui/core/Card';
  import CardContent from '@material-ui/core/CardContent';
  import CardActions from '@material-ui/core/CardActions';
  import Button from '@material-ui/core/Button';

// my components
  import Script from 'react-load-script'
  
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

class _PersonalProjects extends React.Component {

  componentDidMount = () => {
    ReactDOM.render(<Script url="http://jje.surge.sh/js/gameSandbox.js"/>, document.getElementById('dummy4script'));
  }

  render() {
    return (
      <div>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="headline" color="primary" align="center" gutterBottom>
              Personal Card stuff
            </Typography>
            <Typography variant="subheading" color="default" >
              Stuff about raw JS canvas games i made.
            </Typography>
            <div id="dummy4script" />
            <div id="versionSandbox" />
            <div id="hookSandBox" />

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

}

export default (_PersonalProjects);