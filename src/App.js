import React, { Component } from 'react';
import Settings from './components/Settings';
import GameBoard from './components/GameBoard';
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
      status: game.status,
      time: 999,
      timerID: null,
    };
  }

  changeDifficulty = e => {
    e.preventDefault();
    const { difficulty, width, height, mines } = this.state;
    this.stopTimer();
    const options = {
      n: Number(height),
      m: Number(width),
      b: Number(mines),
    };
    const game = new MinesweeperGame(difficulty, options);
    const { grid, status, numColumns, numRows, numBombs } = game;
    this.setState({
      game,
      grid: grid,
      status: status,
      width: numColumns.toString(),
      height: numRows.toString(),
      mines: numBombs.toString(),
      time: 999,
      timerID: null,
    });
  };

  _copyGrid = () => {
    const { game } = this.state;
    const grid = game.grid.slice().map(row => row.slice());
    return grid;
  };

  cellIsFlagged = (row, col) => {
    return this.state.game.cellIsFlagged(row, col);
  };

  flagCell = (row, col) => {
    this.state.game.flagCell(row, col);
  };

  startTimer = () => {
    let count = 0;
    const timerID = setInterval(() => {
      count += 1;
      this.setState({ time: count });
    }, 1000);
    this.setState({ time: count, timerID });
  };

  stopTimer = () => {
    clearInterval(this.state.timerID);
  };

  handleClick = (e, row, col) => {
    e.preventDefault();
    const { game, time } = this.state;
    if (time === 999) this.startTimer();
    if (e.type === 'click') {
      game.checkCell(Number(row), Number(col));
      const grid = this._copyGrid();
      this.setState({ grid, status: game.status });
    } else if (e.type === 'contextmenu') {
      this.flagCell(row, col);
      const grid = this._copyGrid();
      this.setState({ grid, status: game.status });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { difficulty, width, height, mines, grid, status, time } = this.state;
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
        <GameBoard
          grid={grid}
          handleClick={this.handleClick}
          status={status}
          cellIsFlagged={this.cellIsFlagged}
          stopTimer={this.stopTimer}
          time={time}
          mines={mines}
        />
      </div>
    );
  }
}

export default App;
