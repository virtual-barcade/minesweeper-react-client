/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/**
 * Skeleton of Tests
 *
 * Test to ensure that classNames are appropriately set according to the win condition.
 * In other words, test that in a loss or win event, the className game-over is set on the
 * GameBoard / win message.
 *
 * Snapshot testing of the DOM in order to ensure that DOM structure doesn't inadvertently change.
 *
 * Test to ensure that state variables like height, width, and mines on the client are of type string.
 * Note that the Minesweeper API expects numbers so the strings are converted to numbers prior to
 * invoking any Minesweeper API methods.
 *
 * Test to ensure that the timer starts when game starts and stops when game ends.
 *
 * When submitting custom game settings, test to ensure that the correct values are passed via state.
 */
