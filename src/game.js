// Pure tic-tac-toe game logic. No DOM references — safe to import from Node.

export const EMPTY = ' ';

export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export const PLAYERS = [
  { num: 1, mark: 'X' },
  { num: 2, mark: 'O' },
];

export function newBoard() {
  return Array(9).fill(EMPTY);
}

export function render(board) {
  const cells = board.map((c, i) => (c === EMPTY ? String(i + 1) : c));
  const rows = [
    ` ${cells[0]} | ${cells[1]} | ${cells[2]} `,
    ` ${cells[3]} | ${cells[4]} | ${cells[5]} `,
    ` ${cells[6]} | ${cells[7]} | ${cells[8]} `,
  ];
  const separator = '-'.repeat(rows[0].length);
  return `${rows[0]}\n${separator}\n${rows[1]}\n${separator}\n${rows[2]}`;
}

export function parseMove(raw, board) {
  const text = String(raw).trim();
  if (!/^\d+$/.test(text)) {
    throw new Error(`'${raw}' is not a number between 1 and 9.`);
  }
  const value = Number(text);
  if (value < 1 || value > 9) {
    throw new Error(`${value} is out of range; pick 1-9.`);
  }
  const idx = value - 1;
  if (board[idx] !== EMPTY) {
    throw new Error(`Position ${value} is already taken.`);
  }
  return idx;
}

export function applyMove(board, idx, mark) {
  board[idx] = mark;
}

export function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] !== EMPTY && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function isFull(board) {
  return board.every((cell) => cell !== EMPTY);
}

export function playerForTurn(turn) {
  return PLAYERS[turn % 2];
}
