import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from './../firebase';

const Container = styled.header`
  position: sticky;
  top: 0;
  margin: 0;
  height: 75px;
  width: 100vw;
  background: #303036;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
`;

const Btn = styled.button`
  height: 100%;
  width: 250px;
  background-color: transparent;
  border: none;
  justify-self: end;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  margin: 0;
  align-self: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Text = styled.h1`
  margin: 0 0 0 50px;
  font-weight: 200;
  color: #FFFAFF;
`;

class Header extends React.Component {

  onClick() {
    firebase.auth().signOut()
      .then(() => {
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <Container>
        <Link to="/"><Text>{ this.props.title }</Text></Link>
        <Btn onClick={ this.onClick.bind(this) } >
          <Image src={ this.props.icon } alt={ 'profile icon' }/>
          <Text>Sign Out</Text>
        </Btn>
      </Container>
    )
  }
}

export default Header;