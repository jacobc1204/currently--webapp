import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './components/home';
import Login from './components/login';
import Log from './components/log';
import Goal from './components/goal';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ Login } />
          <Route path="/goal" component={ Goal } />
          <Route path="/home" component={ Home }/>
          <Route path="/log" component={ Log } />
        </div>
      </Router>
    );
  }
}

export default App;
