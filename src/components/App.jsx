import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import BottomNav from './BottomNav';
import Home from './Home';
import Games from './Games';
import Projects from './Projects';
import Rmmv from './Rmmv';
import Music from './Music';

class App extends Component {
  render() {
    return (
      <Router><div>
        <CssBaseline />
        <Header />
        <Route exact path="/je-react/Home" component={Home}/>
        <Route exact path="/je-react/Games" component={Games}/>
        <Route exact path="/je-react/Projects" component={Projects}/>
        <Route exact path="/je-react/Rmmv" component={Rmmv}/>
        <Route exact path="/je-react/Music" component={Music}/>
        <BottomNav />
      </div></Router>
    );
  }
}

export default App;
