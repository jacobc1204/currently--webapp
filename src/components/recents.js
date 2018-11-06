import React from 'react';
import styled from 'styled-components';
import BookCard from './bookCard';

const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  justify-items: center;
  padding-bottom: 100px;
`;

class Recents extends React.Component {

  render() {
    return (
      <Container>
        <h2>Recent Books</h2>
        {
          this.props.books.map((book, i) => {
            return (
              <BookCard key={ i } index={ i } onClick={ () => this.showBtn() } book={ book }></BookCard>
            )
          })
        }
      </Container>
    )
  }
}

export default Recents;
