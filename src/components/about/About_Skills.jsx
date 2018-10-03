import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = {
  base: {
    minWidth: 275,
    padding: 10,
  },
  chip: {
    margin: 4,
  }
};

export default class AboutSkillsChips extends React.Component {
  state = {
    chipData: [
      {key: 0, label: 'ReactJS', avatar: 'JS', url: ''},
      {key: 1, label: '.NET Core', avatar: 'C#', url: ''},
      {key: 2, label: 'PIXI', avatar: 'JS', url: ''},
      {key: 3, label: 'Ruby', avatar: '.rb', url: 'https://pastebin.com/3rWZFbKU'},
      {key: 4, label: 'Database Management', avatar: 'SQL', url: 'http://ffexdb.azurewebsites.net/'},
      {key: 5, label: 'Cloud Data', avatar: 'Data', url: 'http://ffexdb.azurewebsites.net/'},
      {key: 6, label: 'nodeJS', avatar: 'JS', url: ''},
      {key: 7, label: 'Angular', avatar: 'g', url: ''}
    ],
  };

  handleClick = data => () => {
    console.log(data.label);
  };

  render() {
    return (
      <div>
        <Paper style={styles.base} align="center">
          <Typography variant="headline" gutterBottom>
            Languages / Frameworks I use or have used:
          </Typography>
          {this.state.chipData.map(data => {
            let link = undefined;
            let comp = "div";
            if (data.url) {
              link = data.url;
              comp = "a";
            }
            return (
              <Chip
                key={data.key}
                avatar={<Avatar>{data.avatar}</Avatar>}
                label={data.label}
                onClick={this.handleClick(data)}
                component={comp}
                href={link}
                style={styles.chip}
              />
            ); })}
        </Paper>
      </div>
    );
  };
}