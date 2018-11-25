import React from 'react';
import styled from 'styled-components';
import { ToastContainer, ToastStore } from 'react-toasts';
import firebase from '../firebase';
import firestore from '../firestore';

import Button from './button';
import books from '../assets/books.jpg';

const cloudinary = `https://res.cloudinary.com/dbb17m8ni/image/fetch/w_auto,c_fit,q_auto,dpr_auto,f_auto,fl_progressive/https://currently.netlify.com`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1;
`;

const Text = styled.h3`
  color: #303036;
  text-align: center;
  background: #FFFAFF74;
`;

const Form = styled.form`
  justify-self: center;
  display: grid;
  grid-gap: 2em;
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

class Goal extends React.Component {

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  onClick(user, event) {
    event.preventDefault();
    if (!this.state.goal) {
      this.setState({ submitError: true });
      ToastStore.error('Please try again.');
      return;
    }
    const userID = user.uid;
    const userRef = firestore.collection('users').doc(userID);
    userRef.set({ goal: this.state.goal }, { merge: true });
    this.props.history.push('/');
  }

  constructor() {
    super();
    this.state = {
      user: null,
      goal: null,
      submitError: true
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        return;
      } else {
        this.props.history.push('/login');
      }
    })
  }

  render() {
    return (
      <Container className={ 'goal' }>
        <Image src={ `${cloudinary}${books}` } alt={"An open book"} />
        <Text>How many books would you like to read this year?</Text>
        { this.state.submitError ? <ToastContainer store={ ToastStore } /> : null }
        <Form onSubmit={ (event) => { this.onClick(this.state.user, event) } } >
          <Input name="goal" type="number" min="0" placeholder="30" value={ this.state.goal } onChange={ this.handleChange.bind(this) }></Input>
          <Button title="Set Goal" />
        </Form>
      </Container>
    )
  }
}

export default Goal;