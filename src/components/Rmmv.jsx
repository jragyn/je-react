import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RmmvCAEX from './Rmmv_CAEX';
import RmmvPlugins from './Rmmv_Plugins';

const styles = {
  card: {
    minWidth: 275,
    margin: 10,
    padding: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '30%',
    border: '1px solid black'
  },
  innerCard: {
    margin: 10,
    padding: 10,
  }
};

class RmmvPage extends React.Component {

  render() {
    return (
      <div>
        <RmmvCAEX />
        <RmmvPlugins />
      </div>
    );
  }

}

RmmvPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RmmvPage);