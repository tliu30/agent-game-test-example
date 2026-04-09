import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  EMPTY,
  newBoard,
  render,
  parseMove,
  applyMove,
  checkWinner,
  isFull,
} from '../src/game.js';

// NewBoardTests
test('newBoard > is empty', () => {
  const board = newBoard();
  assert.equal(board.length, 9);
  assert.ok(board.every((cell) => cell === EMPTY));
});

// RenderTests
test('render > shows position numbers when empty', () => {
  const out = render(newBoard());
  for (let n = 1; n <= 9; n++) {
    assert.ok(out.includes(String(n)), `expected ${n} in output`);
  }
});

test('render > shows marks', () => {
  const board = newBoard();
  applyMove(board, 4, 'X');
  const out = render(board);
  assert.ok(out.includes('X'));
  // Position 5 (index 4) is now X, so the literal "5" should be gone.
  assert.ok(!out.includes('5'));
});

test('render > uses pipe and dash', () => {
  const out = render(newBoard());
  assert.ok(out.includes('|'));
  assert.ok(out.includes('-'));
});

// ParseMoveTests
test('parseMove > valid low and high', () => {
  const board = newBoard();
  assert.equal(parseMove('1', board), 0);
  assert.equal(parseMove('9', board), 8);
});

test('parseMove > strips whitespace', () => {
  assert.equal(parseMove('  3  ', newBoard()), 2);
});

test('parseMove > non-numeric raises', () => {
  assert.throws(() => parseMove('a', newBoard()));
});

test('parseMove > out of range raises', () => {
  assert.throws(() => parseMove('0', newBoard()));
  assert.throws(() => parseMove('10', newBoard()));
});

test('parseMove > occupied raises', () => {
  const board = newBoard();
  applyMove(board, 0, 'X');
  assert.throws(() => parseMove('1', board));
});

// CheckWinnerTests
test('checkWinner > row win', () => {
  const board = ['X', 'X', 'X',
                 ' ', ' ', ' ',
                 ' ', ' ', ' '];
  assert.equal(checkWinner(board), 'X');
});

test('checkWinner > column win', () => {
  const board = ['O', ' ', ' ',
                 'O', ' ', ' ',
                 'O', ' ', ' '];
  assert.equal(checkWinner(board), 'O');
});

test('checkWinner > diagonal win', () => {
  const board = ['X', ' ', ' ',
                 ' ', 'X', ' ',
                 ' ', ' ', 'X'];
  assert.equal(checkWinner(board), 'X');
});

test('checkWinner > anti-diagonal win', () => {
  const board = [' ', ' ', 'O',
                 ' ', 'O', ' ',
                 'O', ' ', ' '];
  assert.equal(checkWinner(board), 'O');
});

test('checkWinner > no winner empty', () => {
  assert.equal(checkWinner(newBoard()), null);
});

test('checkWinner > no winner mixed', () => {
  const board = ['X', 'O', 'X',
                 'X', 'O', 'O',
                 'O', 'X', 'X'];
  assert.equal(checkWinner(board), null);
});

// IsFullTests
test('isFull > empty not full', () => {
  assert.equal(isFull(newBoard()), false);
});

test('isFull > full board', () => {
  const board = ['X', 'O', 'X',
                 'X', 'O', 'O',
                 'O', 'X', 'X'];
  assert.equal(isFull(board), true);
});

test('isFull > partial not full', () => {
  const board = newBoard();
  applyMove(board, 0, 'X');
  assert.equal(isFull(board), false);
});
