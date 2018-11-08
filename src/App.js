import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import './App.css';
import firebase from './firebase';
import Home from './components/home';
import Login from './components/login';
import Log from './components/log';
import Goal from './components/goal';

const Spinner = styled.div`
  text-align: center;
  position: absolute;
  top: 25%;
  left: 50%;
`;

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    }
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    if (this.state.loading === true) {
      return (
        <Spinner>
          <ReactLoading type={ 'spin' } color={ '#FB4747' } />
        </Spinner>
      )
    }

    return (
      <Router>
        <div>
          { this.state.authenticated === false ? <Redirect to="/login" /> : null }
          <Route exact path="/" component={ Home } />
          <Route path="/log" component={ Log } />
          <Route path="/goal" component={ Goal }/>
          <Route path="/login" component={ Login } />
        </div>
      </Router>
    );
  }
}

export default App;
