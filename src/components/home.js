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

const Container = styled.div`
  display: grid;
  justify-items: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5em;
`;

class Home extends React.Component {

  getBooks(user) {
    const userId = user.uid;
    const userRef = firestore.collection('users').doc(userId);
    userRef.onSnapshot({ includeMetadataChanges: true }, (doc) => {
      if (doc.data()) {
        if (doc.data().books && doc.data().goal) {
          const goal = parseInt(doc.data().goal, 10);
          const recentBooks = doc.data().books.reverse().slice(0, 4);
          const progress = (doc.data().books.length / goal);
          this.setState({
            books: recentBooks,
            icon: user.photoURL,
            goal,
            progress,
            count: doc.data().books.length
          });
        } else {
          return;
        }
      } else {
        this.props.history.push('/goal');
      }
    });
  }

  showModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
  }

  constructor() {
    super();
    this.state = {
      icon: null,
      progress: null,
      goal: null,
      count: 0,
      books: [],
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      user ? this.getBooks(user) : this.props.history.push('/login');
    })
  }

  render() {
    return (
      <Container>
        <Header title={ 'Currently' } icon={ this.state.icon } history={ this.props.history } />
        <Modal count={ this.state.count } goal={ this.state.goal }/>
        <Progress progress={ Math.floor(this.state.progress * 100) || 0 } onClick={ this.showModal }/>
        <Buttons>
          <Link to="/log"><Button title='Log Book' /></Link>
          <Link to="/goal"><Button title='Set Goal' /></Link>
        </Buttons>
        <Recents books={ this.state.books } />
      </Container>
    )
  }
}

export default Home;