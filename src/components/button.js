import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  height: 55px;
  width: 30vw;
  background-color: #5CBCEC;
  border: none;
  border-radius: 10px;
  margin: 25px 0;
  box-shadow: 0 3px 4px 2px #ddd2;
`;

const Text = styled.p`
  color: #303036;
  margin: 0;
  font-size: 1.4em;
`;

class Button extends React.Component {
  render() {
    return (
      <Btn onClick={ this.props.onClick }>
        <Text>{ this.props.title }</Text>
      </Btn>
    )
  }
}

export default Button;
