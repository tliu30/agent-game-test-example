# Introduction

Create a command line tic-tac-toe game. It should allow for two people to play
it interactively on a single computer (in particular, no networking, etc).

The user flow will be:
(1) Display the empty board (using '|' and '-')
    - board should have numbers indicating positions
(2) Prompt first player (the 'X') to make a move; accepted input is a numbered position, e.g., 1
(3) once move inputted, display "X' in that position
(4) Prompt second player (the 'O') to make a move, as in (2)
(5) display 'O' as in (3)
(6) Repeat (2)-(5) until win condition is met (three in a row vertically,
horizontally, or diagonally)
    - display "Player {1, 2} wins" message
(7) If board full and no one has won, display "Tie" message

and then end game by exiting.

Write it in Python using base library (e.g., no ncurses, we are keeping it
simple).

