import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './App.css';
import firebase from './firebase';

import Home from './components/home';
import Login from './components/login';
import Log from './components/log';
import Goal from './components/goal';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    firebase.auth().currentUser ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <PrivateRoute exact path="/" component={ Home } />
          <PrivateRoute path="/goal" component={ Goal }/>
          <PrivateRoute path="/log" component={ Log } />
          <Route path="/login" component={ Login } />
        </div>
      </Router>
    );
  }
}

export default App;
