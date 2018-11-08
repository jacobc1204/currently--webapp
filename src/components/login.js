import React from 'react';
import firebase from './../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';

import books from '../assets/books.jpg';

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

const Text = styled.h1`
  color: #303036;
  z-index: 1;
  text-align: center;
`;

class Login extends React.Component {

  config = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/');
      }
    })
  }

  render() {
    return (
      <Container>
        <Image src={ books } alt={"An open book."} />
        <Text>Currently</Text>
        <StyledFirebaseAuth uiConfig={ this.config } firebaseAuth={ firebase.auth() } />
      </Container>
    )
  }
}

export default Login;