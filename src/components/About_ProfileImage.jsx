import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ItsaMe from '../assets/je_230817.jpg';

const styles = {
  base: {
    width: 250,
    alignment: "center",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  pic: {
    width: 240,
    margin: 5,
  }
};

class AboutProfileImage extends React.Component {

  render() {
    return (
      <div>
        <Paper style={styles.base}>
            <img src={ItsaMe} alt="its a me" style={styles.pic} />
        </Paper>
      </div>
    );
  };
}

export default AboutProfileImage;