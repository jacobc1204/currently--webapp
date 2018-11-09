import React from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import firestore from '../firestore';

import { Redirect } from 'react-router-dom';
import { ToastContainer, ToastStore } from 'react-toasts';

import Button from './button';
import Header from './header';

const Container = styled.div`
  display: grid;
  justify-self: center;
  grid-gap: 2em;
`;

const Input = styled.input`
  font-family: 'Karla', sans-serif;
  height: 2.1em;
  width: 90vw;
  justify-self: center;
  font-size: 2em;
  text-align: center;
  background-color: #DDD;
  border: none;
  border-radius: 10px;
`;

const BtnContainer = styled.div`
  margin: 0 5vw 0 0;
  justify-self: end;
`;

class Log extends React.Component {

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  getBooks() {
    // is the form empty?
    if (!this.state.book || !this.state.author || !this.state.date) {
      this.setState({ submitError: true });
      ToastStore.error('Please try again.');
      return;
    }
    // if not log the book
    this.setState({ submitError: false });
    const user = firebase.auth().currentUser.uid;
    const userRef = firestore.collection('users').doc(user);
    const books = [];
    userRef.get()
      .then(doc => {
        if (doc.data()) {
          if (doc.data().books) {
            books.push(...doc.data().books);
          }
        }
      })
      .then(() => {
        books.push({
          book: this.state.book,
          author: this.state.author,
          date: this.state.date
        });
        userRef.set({ books }, { merge: true });
        this.setState({ isLogged: true });
      })
      .catch(error => console.log(error));
  }

  constructor() {
    super();
    this.state = {
      isLogged: false,
      icon: '',
      book: '',
      author: '',
      date: '',
      submitError: true,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const icon = firebase.auth().currentUser.photoURL;
        this.setState({ icon });
      }
    })
  }

  render() {
    if (this.state.isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container>
          <Header title={ 'Log' } icon={ this.state.icon } history={ this.props.history } />
          { this.state.submitError ? <ToastContainer store={ ToastStore } /> : null }
          <Input name="book" type="text" placeholder="Title" value={ this.state.book } onChange={ this.handleChange.bind(this) }></Input>
          <Input name="author" type="text" placeholder="Author" value={ this.state.author } onChange={ this.handleChange.bind(this) }></Input>
          <Input name="date" type="text" placeholder="Date" value={ this.state.date } onChange={ this.handleChange.bind(this) }></Input>
          <BtnContainer>
            <Button title="Log" onClick={ this.getBooks.bind(this) } />
          </BtnContainer>
        </Container>
      </div>
    )
  }
}

export default Log;