import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from './../firebase';

const cloudinary = `https://res.cloudinary.com/dbb17m8ni/image/fetch/w_auto,c_fit,q_60,dpr_auto,f_auto,fl_progressive/`;

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
  width: 11em;
  background-color: #5CBCEC;
  border: none;
  justify-self: end;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  align-self: center;
  width: 3em;
  height: 3em;
  border-radius: 50%;
`;

const Title = styled.h1`
  margin: 0 0.2em 0 0.4em;
  font-weight: 200;
  font-size: 2.5em;
  color: #FFFAFF;
`;

const Text = styled.h2`
  margin: 0 0.2em 0 0.4em;
  font-weight: 200;
  font-size: 1.2em;
  color: #303036;
`;

class Header extends React.Component {

  onClick() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <Container>
        <Link to="/"><Title>{ this.props.title }</Title></Link>
        <Btn onClick={ () => this.onClick() } >
          { this.props.icon ? <Image src={ `${cloudinary}${this.props.icon}` } alt={ 'profile icon' }/> : null }
          <Text>Sign Out</Text>
        </Btn>
      </Container>
    )
  }
}

export default Header;