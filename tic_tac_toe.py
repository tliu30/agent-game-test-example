"""Command line tic-tac-toe for two players on one machine."""

EMPTY = " "

WIN_LINES = (
    (0, 1, 2), (3, 4, 5), (6, 7, 8),  # rows
    (0, 3, 6), (1, 4, 7), (2, 5, 8),  # columns
    (0, 4, 8), (2, 4, 6),             # diagonals
)


def new_board():
    return [EMPTY] * 9


def render(board):
    cells = [str(i + 1) if board[i] == EMPTY else board[i] for i in range(9)]
    rows = [
        f" {cells[0]} | {cells[1]} | {cells[2]} ",
        f" {cells[3]} | {cells[4]} | {cells[5]} ",
        f" {cells[6]} | {cells[7]} | {cells[8]} ",
    ]
    separator = "-" * len(rows[0])
    return f"{rows[0]}\n{separator}\n{rows[1]}\n{separator}\n{rows[2]}"


def parse_move(raw, board):
    text = raw.strip()
    if not text.isdigit():
        raise ValueError(f"'{raw}' is not a number between 1 and 9.")
    value = int(text)
    if not 1 <= value <= 9:
        raise ValueError(f"{value} is out of range; pick 1-9.")
    idx = value - 1
    if board[idx] != EMPTY:
        raise ValueError(f"Position {value} is already taken.")
    return idx


def apply_move(board, idx, mark):
    board[idx] = mark


def check_winner(board):
    for a, b, c in WIN_LINES:
        if board[a] != EMPTY and board[a] == board[b] == board[c]:
            return board[a]
    return None


def is_full(board):
    return all(cell != EMPTY for cell in board)


def prompt_move(player_num, mark, board):
    print(render(board))
    while True:
        raw = input(f"Player {player_num} ({mark}), enter position (1-9): ")
        try:
            return parse_move(raw, board)
        except ValueError as err:
            print(err)


def main():
    board = new_board()
    players = [(1, "X"), (2, "O")]
    for turn in range(9):
        player_num, mark = players[turn % 2]
        idx = prompt_move(player_num, mark, board)
        apply_move(board, idx, mark)
        if check_winner(board) is not None:
            print(render(board))
            print(f"Player {player_num} ({mark}) wins")
            return
    print(render(board))
    print("Tie")


if __name__ == "__main__":
    main()
