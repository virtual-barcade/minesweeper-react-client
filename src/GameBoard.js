import React, { Component } from 'react';
import Row from './components/Row';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      grid: props.grid,
    };
    console.log(props.game._matrix);
    console.log(props.game.grid);
  }

  _copyGrid = () => {
    const { game } = this.state;
    const grid = game.grid.slice().map(row => row.slice());
    return grid;
  };

  checkCell = (row, col) => {
    const { game } = this.state;
    console.log(game._matrix);
    console.log(game.grid);
    console.log(Number(row), Number(col));
    game.checkCell(Number(row), Number(col));
    // const grid = this._copyGrid();
    // this.setState({ grid });
  };

  render() {
    const { grid } = this.state;
    return (
      <div>
        {grid.map((row, i) => (
          <Row key={i} row={row} i={i.toString()} checkCell={this.checkCell} />
        ))}
      </div>
    );
  }
}

export default GameBoard;
