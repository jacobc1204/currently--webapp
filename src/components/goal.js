import React from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import firestore from '../firestore';

import Button from './button';
import image from '../assets/books.jpg';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1;
`;

const Text = styled.h3`
  color: #FFFAFF;
`;

const Input = styled.input`
  font-family: 'Karla', sans-serif;
  height: 60px;
  font-size: 40px;
  text-align: center;
  background-color: #DDD;
  border: none;
  border-radius: 10px;
`;

class Goal extends React.Component {

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  onClick() {
    const user = firebase.auth().currentUser.uid;
    const userRef = firestore.collection('users').doc(user);
    userRef.set({ goal: this.state.goal }, { merge: true });
    this.props.history.push('/');
  }

  constructor() {
    super();
    this.state = {
      goal: '',
    }
  }

  render() {
    return (
      <Container className={ 'goal' }>
        <Image src={ image } alt={"An open book"} />
        <Text>How many books would you like to read this year?</Text>
        <Input name="goal" type="text" placeholder="30" value={ this.state.goal } onChange={ this.handleChange.bind(this) }></Input>
        <Button title="Set Goal" onClick={ this.onClick.bind(this) } />
      </Container>
    )
  }
}

export default Goal;