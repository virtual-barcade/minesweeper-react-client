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

Cell State Legend:

- 0: Unvisited, no bomb

- 1: Unvisited, bomb

- 2: Visited, no bomb

- 3: Unvisited, no bomb, flagged

- 4: Unvisited, bomb, flagged
