import React from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import firestore from '../firestore';

import { Link } from 'react-router-dom';

import Progress from './progress';
import Button from './button';
import Recents from './recents';
import Header from './header';
import Modal from './modal';
import Goal from './goal';

const Container = styled.div`
  display: grid;
  justify-items: center;
`;

class Home extends React.Component {

  getBooks() {
    const user = firebase.auth().currentUser.uid;
    const displayName = firebase.auth().currentUser.displayName;
    const icon = firebase.auth().currentUser.photoURL;
    const userRef = firestore.collection('users').doc(user);
    const books = [];
    let goal;
    userRef.onSnapshot((doc) => {
      const recentBooks = doc.data().books.reverse().slice(0, 4);
      const progress = (doc.data().books.length / goal);
      this.setState({ books: recentBooks, progress, count: doc.data().books.length });
    })
    userRef.get()
      .then(doc => {
        if (doc.data()) {
          books.push(...doc.data().books);
          goal = parseInt(doc.data().goal, 10);
        }
      })
      .then(() => {
        const recentBooks = books.reverse().slice(0, 4);
        const progress = (books.length / goal);
        this.setState({ books: recentBooks, displayName, icon, count: books.length, progress, goal });
      })
      .catch(error => {
        this.props.history.push('/goal');
      });
  }

  showModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
  }

  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      displayName: '',
      icon: '',
      progress: 0,
      goal: '',
      count: 0,
      books: [],
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getBooks();
        this.setState({ isSignedIn: true });
      } else {
        this.props.history.push('/');
      }
    })
  }

  render() {
    return (
      <Container>
        <Header title="Currently" icon={ this.state.icon } history={ this.props.history }/>
        <Modal count={ this.state.count } goal={ this.state.goal }/>
        <Progress progress={ Math.floor(this.state.progress * 100) } onClick={ this.showModal }/>
        <Link to="/log"><Button title='Log' /></Link>
        <Recents books={ this.state.books } />
      </Container>
    )
  }
}

export default Home;