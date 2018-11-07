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
  width: 30vw;
  background-color: transparent;
  border: none;
  justify-self: end;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: end;
`;

const Image = styled.img`
  margin: 0;
  align-self: center;
  width: 3em;
  height: 3em;
  border-radius: 50%;
`;

const Text = styled.h1`
  margin: 0 1em 0 2em;
  font-weight: 200;
  font-size: ${ props => props.fontSize }em;
  color: #FFFAFF;
`;

class Header extends React.Component {

  onClick() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <Container>
        <Link to="/"><Text fontSize={ 2.5 } >{ this.props.title }</Text></Link>
        <Btn onClick={ () => this.onClick() } >
          <Image src={ this.props.icon } alt={ 'profile icon' }/>
          <Text fontSize={ 1.5 } >Sign Out</Text>
        </Btn>
      </Container>
    )
  }
}

export default Header;