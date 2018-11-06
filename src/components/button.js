import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  height: 55px;
  width: 300px;
  background-color: #5CBCEC;
  border: none;
  border-radius: 10px;
  margin: 25px 0;
  box-shadow: 0 3px 4px 2px #ddd2;
`;

const Text = styled.p`
  margin: 0;
  font-size: 28px;
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
