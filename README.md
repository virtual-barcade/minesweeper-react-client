# Browser-Based Minesweeper

## Feature Roadmap

- Mine flagging (i.e. a way for users to indicate where they think the mines are).

- Timer (i.e. set option to count time to solve or countdown to zero).

- Animations (e.g. when uncovering empty regions).

- Users can set difficulty (e.g. board size and mine count).

- Different numbered cells represented by a different color (e.g. 1s are red, 2s are purple, etc. see example picture).

- Animation when user wins or loses and reveal all mines.

- Unit tests covering edge cases.

## Start-Up

If running locally, clone down repo and run `npm i` or `yarn` and `npm start` or `yarn start`.

See deployed game here: [https://blissful-lichterman-984946.netlify.com/](https://blissful-lichterman-984946.netlify.com/)

Note that I used `create-react-app` to scaffold the project.

## Comments

I'd like to note that one thing I did not get to was making the game board prettier. Ideally I'd like it to look as close to classic minesweeper as possible, or give it my own spin. I decided to focus on separating the game and presentation logic, ensuring the logic worked, and at least implementing the requested stylistic features i.e. adding animations for different events in the game.

## Testing

See `src/lib/MinesweeperGame.test.js` for game / business logic tests.
See `src/App.test.js` for skeleton of client tests.

## Minesweeper Game API / State

Minesweeper game logic resides in `src/lib/MinesweeperGame.js`.

I use a 2D array of integers to represent the different states a cell might have.

### Cell State Legend:

- 0: Unvisited, no bomb

- 1: Unvisited, bomb

- 2: Visited, no bomb

- 3: Unvisited, no bomb, flagged

- 4: Unvisited, bomb, flagged

### API / Usage

Public Methods:

- `checkCell` - Select a cell to sweep for a bomb.
- `flagCell` - Flag a cell as possibly having a bomb.
- `cellIsFlagged` - Check if a cell is flagged.

Public Properties:

- `numRows` - Height of underlying matrix i.e. number of rows.
- `numColumns` - Width of underlying matrix i.e. number of columns.
- `numBombs` - Number of bombs in matrix.
- `status` - Game status i.e. won, lost or in-progress.
- `grid` - A 2D array representing what the player sees when they play the game.

#### Constructor

```javascript
const game = new MinesweeperGame(/* difficulty */, /* options */);
```

Difficulty setting is required. If difficulty set to `'custom'`, options are required, otherwise they are unused.

Difficulty Settings:

- `'easy'`
- `'medium'`
- `'hard'`
- `'custom'`

Options Interface:

```javascript
{
  n: /* number of rows */,
  m: /* number of columns */,
  b: /* number of bombs */
}
```

#### checkCell

```javascript
game.checkCell(/* row */, /* column */); /* --> void */
```

Checks a cell for a bomb. If cell does not have a bomb, counts surrounding bombs. If surrounding bomb count is zero, sweeps mine until it has found cells with a bomb count. Returns void i.e. implicit return of undefined.

#### flagCell

```javascript
game.flagCell(/* row */, /* column */); /* --> void */
```

Updates board state to indicate cell is flagged. Can only flag unvisited cells. Returns void i.e. implicit return of undefined.

#### cellIsFlagged

```javascript
game.cellIsFlagged(/* row */, /* column */); /* --> boolean */
```

Returns true if cell is flagged and false if not.
