import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import BottomNav from './BottomNav';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Rmmv from './Rmmv';

class App extends Component {
  render() {
    return (
      <Router><div>
        <CssBaseline />
        <Header />
        <Route exact path="/je-react/Home" component={Home}/>
        <Route exact path="/je-react/About" component={About}/>
        <Route exact path="/je-react/Projects" component={Projects}/>
        <Route exact path="/je-react/Rmmv" component={Rmmv}/>
        <BottomNav />
      </div></Router>
    );
  }
}

export default App;
