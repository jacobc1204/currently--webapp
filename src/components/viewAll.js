import React, { Component } from 'react'
import styled from 'styled-components';

import firebase from '../firebase';
import firestore from '../firestore';
import BookCard from './bookCard';
import Header from './header';

const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  justify-items: center;
  padding-bottom: 100px;
`;

export default class viewAll extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      books: null,
      icon: null
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.onSnapshot((doc) => {
        if (doc.data()) {
          if (doc.data().books) {
            this.setState({ books: doc.data().books.reverse(), loading: false, icon: user.photoURL });
          }
        }
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <p>loading</p>;
    }
    return (
      <Container>
        <Header icon={ this.state.icon } />
        <h3>Here are all your books</h3>
        {
          this.state.books.map((book, i) => {
            return <BookCard key={ i } index={ i } onClick={ () => this.showBtn() } book={ book } ></BookCard>
          })
        }
      </Container>
    )
  }
}
