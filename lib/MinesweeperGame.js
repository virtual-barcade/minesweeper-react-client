/* eslint-disable no-underscore-dangle */

class MinesweeperGame {
  constructor(difficulty = 'easy', options) {
    this._settings = {
      easy: {
        n: 9,
        m: 9,
        b: 10,
      },
      medium: {
        n: 16,
        m: 16,
        b: 40,
      },
      hard: {
        n: 16,
        m: 30,
        b: 99,
      },
    };

    if (difficulty === 'custom') {
      const { n, m, b } = options;
      this._matrix = MinesweeperGame._initializeMatrix(n, m, b);
    } else {
      const { n, m, b } = this._settings[difficulty];
      this._matrix = MinesweeperGame._initializeMatrix(n, m, b);
    }

    this.grid = this._initializeGrid();
    this.status = 'in-progress';
  }

  static _shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      const r = Math.round(Math.random() * i);
      [array[i], array[r]] = [array[r], array[i]];
    }
    return array;
  }

  static _initializeMatrix(n, m, b) {
    const matrix = [];

    const emptySquares = new Array(n * m - b).fill(0);
    const bombSquares = new Array(b).fill(1);
    const allSquares = MinesweeperGame._shuffle(
      emptySquares.concat(bombSquares),
    );

    for (let i = 0, k = -1; i < allSquares.length; i++) {
      if (i % m === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(allSquares[i]);
    }

    return matrix;
  }

  _initializeGrid() {
    const grid = [];
    const n = this._matrix.length;
    const m = this._matrix[0].length;
    for (let i = 0; i < n; i++) {
      const row = new Array(m).fill('_');
      grid.push(row);
    }
    return grid;
  }

  _revealGrid() {
    for (let i = 0; i < this._matrix.length; i++) {
      for (let j = 0; j < this._matrix[i].length; j++) {
        const value = this._matrix[i][j];
        if (value === 1) {
          this.grid[i][j] = 'B';
        }
      }
    }
    return this.grid;
  }

  _countBombs(row, col) {
    let counter = 0;
    for (let i = -1; i <= 1; i++) {
      if (this._matrix[row + i]) {
        for (let j = -1; j <= 1; j++) {
          const value = this._matrix[row + i][col + j];
          if (Number.isInteger(value) && value === 1) {
            counter++;
          }
        }
      }
    }
    return counter;
  }

  checkCell(row, col) {
    if (this._matrix[row][col] === 1) {
      this.status = 'lost';
      return this._revealGrid();
    }
    this.grid[row][col] = this._countBombs(row, col).toString();
    return this.grid;
  }
}

module.exports = MinesweeperGame;
