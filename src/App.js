import React, { Component } from 'react';
import Settings from './components/Settings';
import GameBoard from './GameBoard';
import logo from './logo.svg';
import './styles/App.css';

const MinesweeperGame = require('./lib/MinesweeperGame');

class App extends Component {
  constructor(props) {
    super(props);
    const game = new MinesweeperGame('easy');
    this.state = {
      difficulty: 'easy',
      width: '9',
      height: '9',
      mines: '10',
      game,
      grid: game.grid,
    };
  }

  changeDifficulty = e => {
    e.preventDefault();
    const { difficulty, width, height, mines } = this.state;
    const options = {
      n: height,
      m: width,
      b: mines,
    };
    const game = new MinesweeperGame(difficulty, options);
    this.setState({ game, grid: game.grid });
  };

  _copyGrid = () => {
    const { game } = this.state;
    const grid = game.grid.slice().map(row => row.slice());
    return grid;
  };

  checkCell = (row, col) => {
    const { game } = this.state;
    game.checkCell(Number(row), Number(col));
    const grid = this._copyGrid();
    this.setState({ grid });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { difficulty, width, height, mines, grid } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Minesweeper</h1>
        </header>
        <Settings
          handleChange={this.handleChange}
          changeDifficulty={this.changeDifficulty}
          difficulty={difficulty}
          width={width}
          height={height}
          mines={mines}
        />
        <GameBoard grid={grid} checkCell={this.checkCell} />
      </div>
    );
  }
}

export default App;
