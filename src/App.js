import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import './App.css';
import firebase from './firebase';
import firestore from './firestore';
import Home from './components/home';
import Login from './components/login';
import Log from './components/log';
import Goal from './components/goal';
import viewAll from './components/viewAll'
import NotFound from './components/notFound';

const Spinner = styled.div`
  display: grid;
  height: 100vh;
  justify-content: center;
  align-content: center;
  text-align: center;
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
        const userRef = firestore.collection('users').doc(user.uid);
        userRef.get()
          .then(doc => {
            if (doc.data()) {
              if (!doc.data().goal) {
                this.setState({ data: false });
              }
            } else {
              this.setState({ data: false });
            }
          });
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
          { this.state.data === false ? <Redirect to={ '/goal' } /> : null }
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/login" component={ Login } />
            <Route path="/log" component={ Log } />
            <Route path="/goal" component={ Goal }/>
            <Route path="/view_all" component={ viewAll } />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
