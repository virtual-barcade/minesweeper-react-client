/* eslint-disable no-underscore-dangle, no-continue */

const Queue = require('./Queue');

class MinesweeperGame {
  constructor(difficulty = 'easy', options) {
    this._numRevealedCells = 0;
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

    /**
     * Object mapping corresponding states to each other to make it easy to toggle.
     *
     * 0 means unvisited, no bomb and 3 means unvisited, no bomb, and flagged
     * so it ought to be a quick operation to toggle between the two.
     *
     * Same idea for 1 (unvisited, bomb) and 4 (unvisited, bomb, flagged).
     */
    this._cellStateToggleMapping = {
      0: 3,
      1: 4,
      3: 0,
      4: 1,
    };

    if (difficulty === 'custom') {
      const { n, m, b } = options;
      this._setBoardState(n, m, b);
    } else {
      const { n, m, b } = this._difficultySettings[difficulty];
      this._setBoardState(n, m, b);
    }

    this.status = 'in-progress';
    this.grid = this._initializeGrid();
  }

  _setBoardState(n, m, b) {
    this.numRows = n;
    this.numColumns = m;
    this.numBombs = b;
    this._matrix = MinesweeperGame._initializeMatrix(n, m, b);
  }

  /**
   *  Knuth / Fisher-Yates shuffle to ensure shuffle is truly random.
   */
  static _shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      const r = Math.round(Math.random() * i);
      [array[i], array[r]] = [array[r], array[i]];
    }
    return array;
  }

  static _initializeMatrix(n, m, b) {
    const matrix = [[]];

    /**
     * JS errors when you try to give the array constructor a negative value.
     * If not careful with inputs received from client, may end up with more bombs
     * than there are spaces.
     *
     * This would be a good edge case to test for as part of TDD. Handled by below
     * conditional ensuring we only generate a matrix if inputs are valid.
     */
    if (n * m - b > 0) {
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
        if (value === 1 || value === 4) {
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
          if (value !== undefined && value === 1) {
            counter++;
          }
        }
      }
    }
    return counter;
  }

  _markCellAsVisited(x, y, numBombs) {
    this._matrix[x][y] = 2;
    this._numRevealedCells++;
    this.grid[x][y] = numBombs.toString();
  }

  /**
   * Iterative BFS to sweep matrix for bombs.
   * @param {integer} row
   * @param {integer} col
   */
  _sweep(row, col) {
    const q = new Queue();
    q.enqueue([row, col]);
    while (!q.isEmpty()) {
      const [x, y] = q.dequeue();
      if (this._matrix[x]) {
        const cell = this._matrix[x][y];
        /**
         * Skip if cell is visited, has a bomb, or is out of bounds.
         *
         * Another good edge case to test for is whether a cell is out of bounds.
         *
         * The way this BFS is constructed, it enqueues if the bombCount is zero. However
         * since the _countBombs method returns 0 by default, it's possible to enqueue out of
         * bound coordinates and get stuck in an infinite loop as the bomb count is zero
         * even though the coordinates are out of bounds.
         *
         * Thus, evaluating the cell coordinates yields undefined, must skip this iteration
         * and not do the bomb count calculation / enqueuing.
         */
        if (cell === undefined || cell === 1 || cell === 2 || cell === 4) {
          continue;
        }
        const numBombs = this._countBombs(x, y);
        if (numBombs === 0) {
          q.enqueue([x - 1, y - 1]);
          q.enqueue([x - 1, y]);
          q.enqueue([x - 1, y + 1]);
          q.enqueue([x, y - 1]);
          q.enqueue([x, y + 1]);
          q.enqueue([x + 1, y - 1]);
          q.enqueue([x + 1, y]);
          q.enqueue([x + 1, y + 1]);
        }
        this._markCellAsVisited(x, y, numBombs);
      }
    }
  }

  _gameWon() {
    const remainingCells =
      this.numRows * this.numColumns - this._numRevealedCells;

    return remainingCells === this.numBombs;
  }

  checkCell(row, col) {
    if (this.status === 'in-progress') {
      const cell = this._matrix[row][col];
      if (cell === 1 || cell === 4) {
        this.status = 'lost';
        this._revealGrid();
      }
      this._sweep(row, col);
      if (this._gameWon()) {
        this.status = 'won';
        this._revealGrid();
      }
    }
  }

  flagCell(row, col) {
    if (this.status === 'in-progress') {
      const cell = this._matrix[row][col];
      if (cell !== 2) {
        this._matrix[row][col] = this._cellStateToggleMapping[cell];
      }
    }
  }

  cellIsFlagged(row, col) {
    const cell = this._matrix[row][col];
    return cell === 3 || cell === 4;
  }
}

module.exports = MinesweeperGame;
