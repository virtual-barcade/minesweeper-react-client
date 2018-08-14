/* eslint-disable no-undef, no-underscore-dangle */

const MinesweeperGame = require('./MinesweeperGame');

describe(`MinesweeperGame's private static initializeMatrix method`, () => {
  test('should create a matrix with n rows, m columns, and b bombs.', () => {
    const n = 9;
    const m = 9;
    const b = 10;
    const matrix = MinesweeperGame._initializeMatrix(n, m, b);
    const numBombs = matrix.reduce(
      (totalBombs, currentRow) =>
        totalBombs +
        currentRow.reduce((bombsInRow, value) => {
          if (value === 1) bombsInRow++;
          return bombsInRow;
        }, 0),
      0,
    );
    expect(matrix.length).toBe(n);
    expect(matrix[0].length).toBe(m);
    expect(numBombs).toBe(b);
  });
});

describe(`MinesweeperGame's initializeGrid method`, () => {
  test('should return a grid representation of the input matrix as an N x M 2D array of underscore strings.', () => {
    const { grid } = new MinesweeperGame('easy');
    // prettier-ignore
    const expected = [
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ];
    expect(grid).toEqual(expected);
  });
});

describe(`MinesweeperGame's revealGrid method`, () => {
  test('should reveal the bombs in the grid.', () => {
    // prettier-ignore
    const bombMatrix = [
      [0, 1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const game = new MinesweeperGame();
    game._matrix = bombMatrix;
    const result = game._revealGrid();
    // prettier-ignore
    const expected = [
      ['_', 'B', '_', '_', '_', '_', '_', '_', 'B'],
      ['_', 'B', 'B', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', 'B', '_', '_', '_', '_', '_'],
      ['_', '_', '_', 'B', '_', '_', 'B', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', 'B', '_', '_'],
      ['_', '_', 'B', '_', '_', '_', '_', '_', '_'],
      ['_', 'B', '_', '_', '_', '_', 'B', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ];
    expect(result).toEqual(expected);
  });
});

describe(`MinesweeperGame's checkCell method`, () => {
  let bombMatrix;
  let game;

  beforeEach(() => {
    // prettier-ignore
    bombMatrix = [
      [0, 1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    game = new MinesweeperGame();
    game._matrix = bombMatrix;
  });

  test('should return a grid showing the number of bombs surrounding the input cell if input cell is not a bomb.', () => {
    game.checkCell(0, 0);
    // prettier-ignore
    const expected = [
      ['2', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ];
    expect(game.grid).toEqual(expected);
  });

  test('should return a grid showing the number of bombs surrounding the input cell if input cell is not a bomb.', () => {
    game.checkCell(0, 2);
    game.checkCell(7, 7);
    // prettier-ignore
    const expected = [
      ['_', '_', '3', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '1', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ];
    expect(game.grid).toEqual(expected);
  });

  test('should return a grid revealing the bombs if input cell is a bomb.', () => {
    game.checkCell(0, 2);
    game.checkCell(2, 2);
    game.checkCell(0, 1);
    // prettier-ignore
    const expected = [
      ['_', 'B', '3', '_', '_', '_', '_', '_', 'B'],
      ['_', 'B', 'B', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '4', 'B', '_', '_', '_', '_', '_'],
      ['_', '_', '_', 'B', '_', '_', 'B', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', 'B', '_', '_'],
      ['_', '_', 'B', '_', '_', '_', '_', '_', '_'],
      ['_', 'B', '_', '_', '_', '_', 'B', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ];
    expect(game.grid).toEqual(expected);
  });
});

describe(`MinesweeperGame's sweep method`, () => {
  test(`should continuously reveal all surrounding cells that also have zero bombs.`, () => {
    const bombMatrix = [
      [0, 1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const game = new MinesweeperGame();
    game._matrix = bombMatrix;
    game.checkCell(8, 4);
    // prettier-ignore
    const expectedGrid = [
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '1', '1', '2', '_', '_', '_'],
      ['_', '_', '_', '1', '0', '1', '_', '_', '_'],
      ['_', '_', '_', '1', '0', '2', '_', '_', '_'],
      ['_', '_', '2', '1', '0', '1', '_', '_', '_'],
      ['_', '_', '1', '0', '0', '1', '_', '_', '_'],
    ];
    const expectedMatrix = [
      [0, 1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 1, 0, 0],
      [0, 0, 1, 2, 2, 2, 0, 0, 0],
      [0, 1, 2, 2, 2, 2, 1, 0, 0],
      [0, 0, 2, 2, 2, 2, 0, 0, 0],
    ];
    expect(game.grid).toEqual(expectedGrid);
    expect(game._matrix).toEqual(expectedMatrix);
  });

  test(`should continuously reveal all surrounding cells that also have zero bombs.`, () => {
    const bombMatrix = [
      [0, 1, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 1, 0, 0],
    ];
    const game = new MinesweeperGame();
    game._matrix = bombMatrix;
    // edge case that breaks game
    game.checkCell(8, 0);
    console.log(game._matrix);
    console.log(game.grid);
    // prettier-ignore
    const expectedGrid = [
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '1', '1', '2', '_', '_', '_'],
      ['_', '_', '_', '1', '0', '1', '_', '_', '_'],
      ['_', '_', '_', '1', '0', '2', '_', '_', '_'],
      ['_', '_', '2', '1', '0', '1', '_', '_', '_'],
      ['_', '_', '1', '0', '0', '1', '_', '_', '_'],
    ];
    const expectedMatrix = [
      [0, 1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 1, 0, 0],
      [0, 0, 1, 2, 2, 2, 0, 0, 0],
      [0, 1, 2, 2, 2, 2, 1, 0, 0],
      [0, 0, 2, 2, 2, 2, 0, 0, 0],
    ];
    expect(game.grid).toEqual(expectedGrid);
    expect(game._matrix).toEqual(expectedMatrix);
  });
});
