import React, { Component } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'

import books from '../assets/books.jpg';

const Container = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
`;

const Image = styled.img`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1;
`;

const Text = styled.h1`
  color: #303036;
  z-index: 1;
  text-align: center;
  position: absolute;
  top: 1em;
  left: 1em;
`;

export default class NotFound extends Component {
  render() {
    return (
      <Container>
        <Image src={ books } alt={"An open book."} />
        <Text>Currently</Text>
        <h1>Page Not Found</h1>
        <Link to={ '/' } style={{ fontSize: 20 }} >Go Home</Link>
      </Container>
    )
  }
}
