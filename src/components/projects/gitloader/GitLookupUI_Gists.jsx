// react components
  import React, {Component} from 'react';
  import ReactDOM from 'react-dom';
// material-ui components
  import Button from '@material-ui/core/Button';
  import Card from '@material-ui/core/Card';
  import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  import Typography from '@material-ui/core/Typography';
  import Divider from '@material-ui/core/Divider';
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  avStyle: {
    width: 100,
    height: 100,
  },
  cardStyle: {
    padding: 16,
    margin: 4,
    maxWidth: 640,
  },
  title: {
    fontSize: 14,
  },
  inStyle: {
    marginBottom: 8,
    marginRight: 8,
  },
  gcStyle: {
    fontSize: 20,
    paddingBottom: 10,
  }
};

class GitLookupUI_Gists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistData: [{// gist group #1
          "id": "temp data",
          "htm_url": "https://api.github.com/gist1",
          "files": {
            "asdf": {
              "filename": "firstFile",
              "language": "C#",
              "raw_url": "https://www.google.com",
            },
            "qwer": {
              "filename": "secondFile",
              "language": "ES6",
              "raw_url": "https://www.bing.com",
            },
          },
          "created_at": "temp date",
          "description": "temp description",
        }],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cardList.length > 0) {
      if (this.state.gistData === nextProps) { /* do nothing */ } else {
        this.setState( gistData => nextProps.cardList );
        this.makeGistCards(nextProps.cardList);
      }
    }
  };

  makeGistCards = (newData) => {
    const that = this; var z;
    if (newData !== undefined || newData !== null) z = newData;
    else z = that.state.gistData;
    var listOfCards = [];
    Object.keys(z).forEach((outerkey) => {
      var childrenCards = [];
      Object.keys(z[outerkey].files).forEach((ikey) => {
        var x = z[outerkey].files[ikey];
        childrenCards.push(
          <Card style={styles.cardStyle} key={ikey}>
            <Typography color='secondary' variant="title">
              {x.filename}
            </Typography>
            <Divider />
            <Typography color='textSecondary'>
              {x.language}
            </Typography>
            <Button color="primary" variant="flat" size="small" href={x.raw_url} target="_blank">
            Link to Gist
            </Button>
          </Card>
        );
      });
      listOfCards.push(
        <ExpansionPanel key={z[outerkey].id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color='textSecondary' variant="caption">
              Gist Group ID: {z[outerkey].id}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color='textSecondary' variant="subheading">
              {z[outerkey].description}<br />
              {z[outerkey].created_at}<br />
              {childrenCards}
            </Typography>            
          </ExpansionPanelDetails>
        </ExpansionPanel> 
      );
    })
    ReactDOM.render(listOfCards, document.getElementById('gistList'));
  }

  render() {
    return (
      <div>
        <ExpansionPanel style={styles.cardStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color='primary' variant="subheading">
              List of Gists
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div id="gistList" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );

  }
}
export default GitLookupUI_Gists