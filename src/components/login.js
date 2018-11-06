import React from 'react';
import firebase from './../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';

import books from '../assets/books.jpg';

const config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const Container = styled.div`
  display: grid;
  align-content: center;
  min-height: 100vh;
`;

const Image = styled.img`
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

class Login extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/home');
      }
    })
  }

  render() {
    return (
      <Container>
        <Image src={ books } alt={"An open book."} />
        <StyledFirebaseAuth uiConfig={ config } firebaseAuth={ firebase.auth() } />
      </Container>
    )
  }
}

export default Login;