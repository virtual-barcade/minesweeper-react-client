/* eslint-disable no-undef, no-underscore-dangle */

const MinesweeperGame = require('./MinesweeperGame');

describe(`MinesweeperGame's private static initializeMatrix method`, () => {
  test('should create a matrix with n rows, m columns, and m bombs.', () => {
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

// describe(`MinesweeperGame's initializeGrid method`, () => {
//   // prettier-ignore
//   const bombMatrix = [
//     [0, 1, 0, 0],
//     [0, 1, 1, 0],
//     [0, 0, 0, 1],
//     [0, 0, 0, 1]
//   ];

//   let game;

//   beforeAll(() => {
//     game = new MinesweeperGame(bombMatrix);
//   });

//   test('should return a grid representation of the input matrix as an N x M 2D array of underscore strings.', () => {
//     const result = game.grid;
//     // prettier-ignore
//     const expected = [
//       ['_', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//     ];
//     expect(result).toEqual(expected);
//   });
// });

// describe(`MinesweeperGame's revealGrid method`, () => {
//   // prettier-ignore
//   const bombMatrix = [
//     [0, 1, 0, 0],
//     [0, 1, 1, 0],
//     [0, 0, 0, 1],
//     [0, 0, 0, 1]
//   ];

//   let game;

//   beforeAll(() => {
//     game = new MinesweeperGame(bombMatrix);
//   });

//   test('should reveal the bombs in the grid.', () => {
//     const result = game._revealGrid();
//     // prettier-ignore
//     const expectedGrid = [
//       ['_', 'B', '_', '_'],
//       ['_', 'B', 'B', '_'],
//       ['_', '_', '_', 'B'],
//       ['_', '_', '_', 'B'],
//     ];
//     expect(result).toEqual(expectedGrid);
//   });
// });

// describe(`MinesweeperGame's checkCell method`, () => {
//   // prettier-ignore
//   let bombMatrix;
//   let game;

//   beforeEach(() => {
//     // prettier-ignore
//     bombMatrix = [
//       [0, 1, 0, 0],
//       [0, 1, 1, 0],
//       [0, 0, 0, 1],
//       [0, 0, 0, 1]
//     ];
//     game = new MinesweeperGame(bombMatrix);
//   });

//   test('should return a grid showing the number of bombs surrounding the input cell if input cell is not a bomb.', () => {
//     game.checkCell(0, 0);
//     // prettier-ignore
//     const expectedGrid = [
//       ['2', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//     ];
//     expect(game.grid).toEqual(expectedGrid);
//   });

//   test('should return a grid showing the number of bombs surrounding the input cell if input cell is not a bomb.', () => {
//     game.checkCell(0, 2);
//     // prettier-ignore
//     const expectedGrid = [
//       ['_', '_', '3', '_'],
//       ['_', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//       ['_', '_', '_', '_'],
//     ];
//     expect(game.grid).toEqual(expectedGrid);
//   });

//   test('should return a grid revealing the bombs if input cell is a bomb.', () => {
//     game.checkCell(0, 2);
//     game.checkCell(2, 2);
//     game.checkCell(0, 1);
//     // prettier-ignore
//     const expectedGrid = [
//       ['_', 'B', '3', '_'],
//       ['_', 'B', 'B', '_'],
//       ['_', '_', '4', 'B'],
//       ['_', '_', '_', 'B'],
//     ];
//     expect(game.grid).toEqual(expectedGrid);
//   });
// });
