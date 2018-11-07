import React from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import firestore from '../firestore';

import { Redirect } from 'react-router-dom';

import Button from './button';
import Header from './header';

const Container = styled.div`
  display: grid;
  justify-self: center;
  min-width: 90vw;
  margin: 30px 50px 0 50px;
  grid-gap: 3em;
`;

const Input = styled.input`
  font-family: 'Karla', sans-serif;
  height: 2.1em;
  font-size: 2em;
  text-align: center;
  background-color: #DDD;
  border: none;
  border-radius: 10px;
`;

const BtnContainer = styled.div`
  justify-self: end;
`;

class Log extends React.Component {

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  getBooks() {
    const user = firebase.auth().currentUser.uid;
    const userRef = firestore.collection('users').doc(user);
    const books = [];
    userRef.get()
      .then(doc => {
        if (doc.data().books) {
          books.push(...doc.data().books);
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
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const icon = firebase.auth().currentUser.photoURL;
        this.setState({ icon });
      } else {
        this.props.history.push('/login');
      }
    })
  }

  render() {
    if (this.state.isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header title="Log" icon={ this.state.icon } />
        <Container>
          <Input name="book" type="text" placeholder="Inkheart" value={ this.state.book } onChange={ this.handleChange.bind(this) }></Input>
          <Input name="author" type="text" placeholder="Cornelia Funke" value={ this.state.author } onChange={ this.handleChange.bind(this) }></Input>
          <Input name="date" type="text" placeholder="August 1 2018" value={ this.state.date } onChange={ this.handleChange.bind(this) }></Input>
          <BtnContainer>
            <Button title="Log" onClick={ this.getBooks.bind(this) } />
          </BtnContainer>
        </Container>
      </div>
    )
  }
}

export default Log;