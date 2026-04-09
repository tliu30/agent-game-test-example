import unittest

from tic_tac_toe import (
    apply_move,
    check_winner,
    is_full,
    new_board,
    parse_move,
    render,
)


class NewBoardTests(unittest.TestCase):
    def test_new_board_is_empty(self):
        board = new_board()
        self.assertEqual(len(board), 9)
        self.assertTrue(all(cell == " " for cell in board))


class RenderTests(unittest.TestCase):
    def test_render_shows_position_numbers_when_empty(self):
        out = render(new_board())
        for n in range(1, 10):
            self.assertIn(str(n), out)

    def test_render_shows_marks(self):
        board = new_board()
        apply_move(board, 4, "X")
        out = render(board)
        self.assertIn("X", out)
        # Position 5 (index 4) is now X, so the literal "5" should be gone.
        self.assertNotIn("5", out)

    def test_render_uses_pipe_and_dash(self):
        out = render(new_board())
        self.assertIn("|", out)
        self.assertIn("-", out)


class ParseMoveTests(unittest.TestCase):
    def test_valid_low_and_high(self):
        board = new_board()
        self.assertEqual(parse_move("1", board), 0)
        self.assertEqual(parse_move("9", board), 8)

    def test_strips_whitespace(self):
        self.assertEqual(parse_move("  3  ", new_board()), 2)

    def test_non_numeric_raises(self):
        with self.assertRaises(ValueError):
            parse_move("a", new_board())

    def test_out_of_range_raises(self):
        with self.assertRaises(ValueError):
            parse_move("0", new_board())
        with self.assertRaises(ValueError):
            parse_move("10", new_board())

    def test_occupied_raises(self):
        board = new_board()
        apply_move(board, 0, "X")
        with self.assertRaises(ValueError):
            parse_move("1", board)


class CheckWinnerTests(unittest.TestCase):
    def test_row_win(self):
        board = ["X", "X", "X",
                 " ", " ", " ",
                 " ", " ", " "]
        self.assertEqual(check_winner(board), "X")

    def test_column_win(self):
        board = ["O", " ", " ",
                 "O", " ", " ",
                 "O", " ", " "]
        self.assertEqual(check_winner(board), "O")

    def test_diagonal_win(self):
        board = ["X", " ", " ",
                 " ", "X", " ",
                 " ", " ", "X"]
        self.assertEqual(check_winner(board), "X")

    def test_anti_diagonal_win(self):
        board = [" ", " ", "O",
                 " ", "O", " ",
                 "O", " ", " "]
        self.assertEqual(check_winner(board), "O")

    def test_no_winner_empty(self):
        self.assertIsNone(check_winner(new_board()))

    def test_no_winner_mixed(self):
        board = ["X", "O", "X",
                 "X", "O", "O",
                 "O", "X", "X"]
        self.assertIsNone(check_winner(board))


class IsFullTests(unittest.TestCase):
    def test_empty_not_full(self):
        self.assertFalse(is_full(new_board()))

    def test_full_board(self):
        board = ["X", "O", "X",
                 "X", "O", "O",
                 "O", "X", "X"]
        self.assertTrue(is_full(board))

    def test_partial_not_full(self):
        board = new_board()
        apply_move(board, 0, "X")
        self.assertFalse(is_full(board))


if __name__ == "__main__":
    unittest.main()
