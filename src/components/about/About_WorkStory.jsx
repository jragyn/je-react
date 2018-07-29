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
  },
  list: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
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
        <GridListTile key={_History[el].company} cols={1}>
          <Typography variant="headline">
          <a href={_History[el].url} target="_blank">{_History[el].company}</a>
          </Typography>
          <Typography variant="caption" color="textSecondary" gutterBottom>
          {_History[el].time}
          </Typography>
          <Typography variant="body1">
          {_History[el].details}
          </Typography>
          <br/>
          <Divider />
          <br/>
        </GridListTile>
      );
    })
    ReactDOM.render(workList, document.getElementById('listOfWork'));
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <GridList cellHeight={200} cols={1} style={styles.list}>
              <div id="listOfWork"/>
            </GridList>
          </CardContent>
        </Card>
      </div>
    )
  }
}