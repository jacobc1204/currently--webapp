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

const Form = styled.form`
  justify-self: center;
  display: grid;
  grid-gap: 1.1em;
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

  getBooks(user, event) {
    event.preventDefault();
    // if the form is empty; don't log
    if (!this.state.book || !this.state.author || !this.state.date) {
      this.setState({ submitError: true });
      ToastStore.error('Please try again.');
      return;
    }
    // if it isn't empty; log the book
    const userId = user.uid;
    const userRef = firestore.collection('users').doc(userId);
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
        this.setState({
          isLogged: true,
          submitError: false
         });
      })
      .catch(error => console.log(error));
  }

  constructor() {
    super();
    this.state = {
      user: null,
      isLogged: false,
      icon: null,
      book: '',
      author: '',
      date: '',
      submitError: true,
    }
    this.getBooks.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          icon: user.photoURL,
          user,
        });
      }
    })
  }

  render() {
    console.log(this.date)
    if (this.state.isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container>
          <Header title={ 'Log' } icon={ this.state.icon } history={ this.props.history } />
          { this.state.submitError ? <ToastContainer store={ ToastStore } /> : null }
          <Form onSubmit={ (event) => { this.getBooks(this.state.user, event) } }>
            <label for="book">Title</label>
            <Input name="book" type="text" value={ this.state.book } onChange={ this.handleChange.bind(this) }></Input>
            <label for="author">Author</label>
            <Input name="author" type="text" value={ this.state.author } onChange={ this.handleChange.bind(this) }></Input>
            <label for="date">Date</label>
            <Input name="date" type="date" value={ this.state.date } onChange={ this.handleChange.bind(this) }></Input>
            <BtnContainer>
              <Button title="Log" />
            </BtnContainer>
          </Form>
        </Container>
      </div>
    )
  }
}

export default Log;