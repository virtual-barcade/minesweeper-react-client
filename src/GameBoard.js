import React, { Component } from 'react';
import Row from './components/Row';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      grid: props.grid,
    };
  }

  render() {
    const { grid } = this.state;
    return (
      <div>
        {grid.map((row, i) => (
          <Row key={i} row={row} i={i} />
        ))}
      </div>
    );
  }
}

export default GameBoard;
