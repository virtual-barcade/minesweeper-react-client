# Browser-Based Minesweeper

## Feature Roadmap

- Mine flagging (i.e. a way for users to indicate where they think the mines are).

- Timer (i.e. set option to count time to solve or countdown to zero).

- Animations (e.g. when uncovering empty regions).

- Users can set difficulty (e.g. board size and mine count).

- Different numbered cells represented by a different color (e.g. 1s are red, 2s are purple, etc. see example picture).

- Animation when user wins or loses and reveal all mines.

- Unit tests covering edge cases.

## Minesweeper Game API / State

### Cell State Legend:

- 0: Unvisited, no bomb

- 1: Unvisited, bomb

- 2: Visited, no bomb

- 3: Unvisited, no bomb, flagged

- 4: Unvisited, bomb, flagged

### API / Usage

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
game.checkCell(/* row */, /* column */); /* --> [game._status, game.grid] */
```

Checks a cell for a bomb returns a tuple with the game status in the first position and the game grid in the second.

#### flagCell

```javascript
game.checkCell(/* row */, /* column */); /* --> void */
```

Updates board state to indicate cell is flagged. Can only flag unvisited cells. Doesn't return anything.
