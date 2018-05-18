import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import BottomNav from './BottomNav';
import Home from './Home.jsx';
import Games from './Games.jsx';

class App extends Component {
  render() {
    return (
      <Router><div>
        <CssBaseline />
        <Header />
        <Route exact path="/" component={Home}/>
        <Route exact path="/Games" component={Games}/>
        <BottomNav />
      </div></Router>
    );
  }
}

export default App;
