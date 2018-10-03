// react components
import React from 'react';
import ReactDOM from 'react-dom';
// material-ui components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
// personal components
import _History from './_WorkHistory';

const styles = {
  card: {
    minWidth: 275,
    float: "right",
  },
  innerCard: {
    padding: 20,

  },
  list: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height: 350
  }
};

export default class AboutWorkStory extends React.Component {

  componentDidMount() {
    this.drawData();
  }

  drawData = () => {
    let workList = [];
    Object.keys(_History).forEach((el) => {
      workList.push(
        <Card style={styles.innerCard}>
          <Typography variant="headline">
          <a href={_History[el].url} target="_blank">{_History[el].company}</a>
          </Typography>
          <Typography variant="caption" color="textSecondary" gutterBottom>
          {_History[el].time}
          </Typography>
          <Typography variant="body1">
          {_History[el].details}
          </Typography>
        </Card>
      );
    })
    ReactDOM.render(workList, document.getElementById('listOfWork'));
  }

  render() {
    return (
      <div>
        <Card>
          <div id="listOfWork"/>
        </Card>
      </div>
    )
  }
}