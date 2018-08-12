/* eslint-disable no-underscore-dangle, no-continue */

const Queue = require('./Queue');

class MinesweeperGame {
  constructor(difficulty = 'easy', options) {
    this._difficultySettings = {
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

    this._cellStateToggleMapping = {
      0: 3,
      1: 4,
      3: 0,
      4: 1,
    };

    if (difficulty === 'custom') {
      const { n, m, b } = options;
      this._matrix = MinesweeperGame._initializeMatrix(n, m, b);
    } else {
      const { n, m, b } = this._difficultySettings[difficulty];
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

    let k = -1;
    for (let i = 0; i < allSquares.length; i++) {
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

  _sweep(row, col) {
    const q = new Queue();
    q.enqueue([row, col]);
    while (!q.isEmpty()) {
      const [x, y] = q.dequeue();
      if (this._matrix[x]) {
        const cell = this._matrix[x][y];
        if (cell === 1 || cell === 2 || cell === 4) continue;
        const numBombs = this._countBombs(x, y);
        if (numBombs === 0) {
          this._matrix[x][y] = 2;
          this.grid[x][y] = numBombs.toString();
          q.enqueue([x - 1, y - 1]);
          q.enqueue([x - 1, y]);
          q.enqueue([x - 1, y + 1]);
          q.enqueue([x, y - 1]);
          q.enqueue([x, y + 1]);
          q.enqueue([x + 1, y - 1]);
          q.enqueue([x + 1, y]);
          q.enqueue([x + 1, y + 1]);
        } else {
          this._matrix[x][y] = 2;
          this.grid[x][y] = numBombs.toString();
        }
      }
    }
  }

  checkCell(row, col) {
    const cell = this._matrix[row][col];
    if (cell === 1 || cell === 4) {
      this.status = 'lost';
      return this._revealGrid();
    }
    this._sweep(row, col);
    return this.grid;
  }

  flagCell(row, col) {
    const cell = this._matrix[row][col];
    if (cell !== 2) {
      this._matrix[row][col] = this._cellStateToggleMapping[cell];
    }
  }
}

module.exports = MinesweeperGame;
