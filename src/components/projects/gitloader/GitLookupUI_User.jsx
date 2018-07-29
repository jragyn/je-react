// react components
  import React, {Component} from 'react';
// material-ui components
  import Card from '@material-ui/core/Card';
  import Typography from '@material-ui/core/Typography';
  import Avatar from '@material-ui/core/Avatar';

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

class GitLookupUI_User extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: {
          user: "no user yet searched.",
          avatarURL: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png",
          realName: "",
          bio: "",
          profileLink: "https://www.github.com",
        }
      };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ userData : nextProps });  
    }

    render() {
      return (
        <div>
          <Card style={styles.cardStyle}>
            <Typography color='primary' variant="subheading">
              Github User Data:
            </Typography>
            <Avatar src={this.state.userData.avatarURL} style={styles.avStyle} alt="its a logo" />
            <Typography variant="headline" color="primary">
              <a href={this.state.userData.profileLink} target="_blank">{this.state.userData.user}</a>
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              {this.state.userData.realName}
            </Typography>
            <Typography>
              {this.state.userData.bio}
            </Typography>
          </Card>
        </div>
      );
    }
}

export default GitLookupUI_User;