import React from 'react';
import styled from 'styled-components';
import Button from './button';

const Background = styled.div`
  display: none;
  position: absolute;
  background-color: #bbbe;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  margin: -35vh 0 0 -40vw;
  top: 50%;
  left: 50%;
  box-shadow: 0 3px 4px 2px #dddb;
  background-color: #FFFAFF;
  border-radius: 10px;
  height: 70vh;
  width: 80vw;
`;

const Text = styled.p`
  color: #303036;
  text-align: center;
`;

class Modal extends React.Component {

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  }

  render() {
    return (
      <Background className={ 'modal' } >
        <Container>
          <Text>You have read { this.props.count } out of { this.props.goal } books.</Text>
          <Button title="Close" onClick={ this.closeModal } />
        </Container>
      </Background>
    )
  }
}

export default Modal;