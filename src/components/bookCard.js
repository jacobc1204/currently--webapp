import React from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import firestore from '../firestore';

const Card = styled.div`
  height: 100px;
  width: 80vw;
  box-shadow: 0 3px 4px 2px #dddd;
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-rows: 1fr 1fr;
`;

const BookInfo = styled.div`
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  display: grid;
  justify-items: center;
  align-content: center;
`;

const DelBtn = styled.div`
  background-color: #FB4747;
  justify-self: end;
  height: 100%;
  width: 10%;
  grid-row: 1 / -1;
  grid-column: -1;
  display: ${ props => props.display };
  justify-content: center;
  align-content: center;
`;

class BookCard extends React.Component {

  deleteField = (key) => {
    const user = firebase.auth().currentUser.uid;
    const userRef = firestore.collection('users').doc(user);
    const books = [];
    userRef.get()
      .then(doc => {
        if (doc.data()) {
          books.push(...doc.data().books);
        }
      })
      .then(() => {
        books.reverse();
        books.splice(key, 1);
        userRef.set({ books: books.reverse() }, { merge: true });
      })
      .catch(error => console.log(error));
  }

  showBtn = () => {
    this.state.display === 'none' ? this.setState({ display: 'grid' }) : this.setState({ display: 'none' });
  }

  constructor() {
    super();
    this.state = {
      display: 'none'
    }
  }

  render() {
    return (
      <Card onClick={ () => this.showBtn() } >
        <BookInfo>
          <p>{ this.props.book.book } by { this.props.book.author }</p>
          <p>{ this.props.book.date }</p>
        </BookInfo>
        <DelBtn className={ 'delBtn' } display={ this.state.display } onClick={ () => this.deleteField(this.props.index) }>
          <p>X</p>
        </DelBtn>
      </Card>
    )
  }

}

export default BookCard;