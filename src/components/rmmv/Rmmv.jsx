// react components
import React from 'react';
// personal components
import RmmvCAEX from './Rmmv_CAEX';
import RmmvPlugins from './Rmmv_Plugins';

export default class RmmvPage extends React.Component {
  render() {
    return (
      <div>
        <RmmvCAEX />
        <RmmvPlugins />
      </div>
    );
  }
}