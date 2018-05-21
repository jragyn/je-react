import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = {
  base: {
    minWidth: 275,
    padding: 10,
    margin: 5,
  },
};

class AboutSkillsPaper extends React.Component {
  state = {
    chipData: [
      {key: 0, label: 'React', avatar: 'JS'},
      {key: 1, label: '.NET Core', avatar: 'C#'},
      {key: 2, label: 'PIXI', avatar: 'JS'},
      {key: 3, label: 'Ruby', avatar: '.rb'},
      {key: 4, label: 'Database Management', avatar: 'SQL'},
      {key: 5, label: 'Cloud Data', avatar: 'Data'},
    ],
  };

  handleClick = data => () => {
    console.log(data.label);
  };

  render() {
    return (
      <div>
        <Paper style={styles.base}>
          <Typography gutterBottom>
            I have tech-skills!
          </Typography>
          {this.state.chipData.map(data => {
            return (
              <Chip
                key={data.key}
                avatar={<Avatar>{data.avatar}</Avatar>}
                label={data.label}
                onClick={this.handleClick(data)}
              />
            );
          })}
        </Paper>
      </div>
    );
  };
}

export default AboutSkillsPaper;