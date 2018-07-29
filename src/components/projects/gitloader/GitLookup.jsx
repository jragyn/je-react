// react components
import React, {Component} from 'react';
// material-ui components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
// personal components
import GitUIUser from './GitLookupUI_User';   
import GitUIGists from './GitLookupUI_Gists'; 

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

const emptyState = {
  fullObj: {},
  user: '',
  avatarURL: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png",
  realName: '',
  bio: '',
  profileLink: "https://www.github.com/",
  userInput: '',
};

// elastic IP for my AWS-housed nodeJS express app.
const uri = 'http://52.42.202.204:1337';

class GitLookup extends Component {
    constructor() {
      super();
      this.state = {
        userData: {
          user: '',
          avatarURL: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png",
          realName: '',
          bio: '',
          profileLink: "https://www.github.com/",
        },
        gistData: {
          cardList: [],
        },
        fullObj: {},
        fakeData: false,
        statusMsg: 'enter a name to search github for a specific user!',
        userInput: '',

      };
    }

    queryGithub = () => {
      const that = this;
      that.setState(emptyState);
      var inputName = that.state.userInput;
      if (inputName === "" || undefined) inputName = "jragyn";
      that.setState(statusMsg => 'Searching...');
      fetch(uri + '/git/searchUser/' + inputName)
        .then(function(response) { return response.json(); })
        .then(function(json) {
          if (json.hasOwnProperty('message')) {
            that.setState(emptyState);
            that.setState({msg: 'No user found, try a different name.'})
          } else {
            that.setState({
              statusMsg: 'A user was found!',
              fullObj: json,
              userData: {
                user: json.login,
                avatarURL: json.avatar_url,
                realName: json.name,
                bio: json.bio,
                profileLink: json.html_url,
              },
              userInput: "",
            });
            that.getGistList(inputName);
          }
        })
        .catch(function(ex) {
          that.setState(msg => "An error occured?!");
          that.queryIPgithub();
        });
    };

    // get the list of gists and dump it below the users.
    getGistList = (name) => {
      const that = this;
      var tempArr = [];
      fetch(uri + '/git/gistsList/' + name)
        .then(function(response) { return response.json(); })
        .then(function(json) {
          Object.keys(json).forEach((key) => {
            tempArr.push(json[key]);
          });
          that.setState({ gistData: { cardList : tempArr } });
        })
        .catch(function(ex) {
          that.setState(statusMsg => "An error occured?!");
          console.log('this is what happened: ', ex);
        });
    };
    
    handleChange = (e) => { this.setState({ userInput: e.target.value }); }

    render() {
      return (
        <div>
          <Card style={styles.cardStyle}>
          <Typography variant="subheading" color="primary" align="center" gutterBottom>
            The tool below was a small project in class to pull up a GitHub username, and display
            a list of all their Gists (if they have any), using React and Material-UI. If you don't
            know any usernames off the top of your head, just hit the Search button with no name,
            and it'll pull up my own github info.
          </Typography>
          <Divider /><br />
            <Card style={styles.cardStyle}>
              <Typography color="primary" style={styles.title} gutterBottom>
                Result: <span style={{ color: "gray" }}>{this.state.statusMsg}</span>
              </Typography>
              <FormControl>
                <InputLabel htmlFor="name-helper">GitHub UserName</InputLabel>
                <Input id="name-helper" value={this.state.name} onChange={this.handleChange} style={styles.inStyle} />
              </FormControl><br/>
              <CardActions>
                <Button color="secondary" size="small" onClick={this.queryGithub}>
                    Search GitHub
                </Button>
              </CardActions>
            </Card>
            <GitUIUser {...this.state.userData}/>
            <GitUIGists {...this.state.gistData}/>
          </Card>
        </div>
      );
    }
}

export default GitLookup;