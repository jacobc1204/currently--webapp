import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;
`;

const Heading = styled.button`
  font-size: 67px;
  font-weight: normal;
  background: transparent;
  border: none;
  margin: 25px 0 25px 0;
  color: #3d3d3d;
`;

const Bar = styled.div`
  height: 20px;
  width: 100vw;
  background-color: #FB474733;
`;

const BarFill = styled.div`
  background-color: #FB4747;
  height: 100%;
  width: ${props => props.progress}%;
`;

class Progress extends React.Component {
  render() {
    return (
      <Container>
        <Heading onClick={ this.props.onClick }>{ this.props.progress }%</Heading>
        <Bar>
          <BarFill progress={ this.props.progress } ></BarFill>
        </Bar>
      </Container>
    )
  }
}

export default Progress;