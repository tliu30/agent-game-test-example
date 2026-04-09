import {
  EMPTY,
  newBoard,
  applyMove,
  checkWinner,
  isFull,
  parseMove,
  playerForTurn,
} from './game.js';

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetEl = document.getElementById('reset');

let board;
let turn;
let gameOver;

function svgFor(mark) {
  if (mark === 'X') {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="X">
        <line x1="20" y1="20" x2="80" y2="80"
              stroke="#c0392b" stroke-width="12" stroke-linecap="round" />
        <line x1="80" y1="20" x2="20" y2="80"
              stroke="#c0392b" stroke-width="12" stroke-linecap="round" />
      </svg>`;
  }
  if (mark === 'O') {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="O">
        <circle cx="50" cy="50" r="32"
                fill="none" stroke="#2c3e50" stroke-width="12" />
      </svg>`;
  }
  return '';
}

function buildCells() {
  boardEl.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cell';
    btn.dataset.index = String(i);
    btn.setAttribute('role', 'gridcell');
    btn.setAttribute('aria-label', `Cell ${i + 1}`);
    boardEl.appendChild(btn);
  }
  boardEl.addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell || !boardEl.contains(cell)) return;
    const idx = Number(cell.dataset.index);
    handleClick(idx);
  });
}

function setStatus(text) {
  statusEl.textContent = text;
}

function renderBoard() {
  const cells = boardEl.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    const mark = board[i];
    if (mark !== EMPTY) {
      cell.innerHTML = svgFor(mark);
      cell.disabled = true;
      cell.setAttribute('aria-label', `Cell ${i + 1}, ${mark}`);
    } else {
      cell.innerHTML = '';
      cell.disabled = gameOver;
      cell.setAttribute('aria-label', `Cell ${i + 1}, empty`);
    }
  });
}

function handleClick(idx) {
  if (gameOver) return;
  try {
    parseMove(String(idx + 1), board);
  } catch {
    return;
  }
  const { num, mark } = playerForTurn(turn);
  applyMove(board, idx, mark);
  turn += 1;

  const winner = checkWinner(board);
  if (winner) {
    gameOver = true;
    setStatus(`Player ${num} (${mark}) wins`);
  } else if (isFull(board)) {
    gameOver = true;
    setStatus('Tie');
  } else {
    const next = playerForTurn(turn);
    setStatus(`Player ${next.num} (${next.mark}) — your turn`);
  }
  renderBoard();
}

function resetGame() {
  board = newBoard();
  turn = 0;
  gameOver = false;
  const first = playerForTurn(turn);
  setStatus(`Player ${first.num} (${first.mark}) — your turn`);
  renderBoard();
}

buildCells();
resetEl.addEventListener('click', resetGame);
resetGame();
