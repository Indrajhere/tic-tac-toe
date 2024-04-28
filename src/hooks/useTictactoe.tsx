import { useState } from "react";

type Props = {
  initialBoard: null[];
  size: number
}

const useTictactoe = ({ initialBoard, size }: Props) => {

  const [board, setBoard] = useState<(string | null)[]>(initialBoard);
  const [isNextX, setIsNextX] = useState<boolean>(true);
  console.log('board: ', board);


  const calculateWinningPatterns = (size: number) => {

    const winningPatterns = [];
    const rows = size;
    const cols = size;
    // Horizontal patterns
    for (let i = 0; i < rows; i++) {
      const horizontalPattern = [];
      for (let j = 0; j < cols; j++) {
        horizontalPattern.push(i * cols + j);
      }
      winningPatterns.push(horizontalPattern);
    }
    // Vertical patterns
    for (let i = 0; i < cols; i++) {
      const verticalPattern = [];
      for (let j = 0; j < rows; j++) {
        verticalPattern.push(i + j * cols);
      }
      winningPatterns.push(verticalPattern);
    }
    // Diagonal patterns
    const diagonalPattern1 = [];
    const diagonalPattern2 = [];
    for (let i = 0; i < rows; i++) {
      diagonalPattern1.push(i * (cols + 1));
      diagonalPattern2.push((i + 1) * (cols - 1));
    }
    winningPatterns.push(diagonalPattern1);
    winningPatterns.push(diagonalPattern2);

    return winningPatterns;

  }

  const WINNING_PATTERNS = calculateWinningPatterns(size);


  const calculateWinner = () => {
    for (var i = 0; i < WINNING_PATTERNS.length; i++) {
      const currentPat = WINNING_PATTERNS[i];
      const winningSymbol = board[currentPat[0]];
      if (winningSymbol) {
        var winnerFound = true;
        for (var j = 0; j < size - 1; j++) {
          const currentIndex = currentPat[j];
          const nextIndex = currentPat[j + 1];
          if (!board[currentIndex] || board[currentIndex] !== board[nextIndex]) {
            winnerFound = false;
            break;
          }
        }
        if (winnerFound) {
          return board[currentPat[0]]
        }
      }
    }
    return null;
  }

  const getStatusMessage = () => {
    const winner = calculateWinner();

    if (winner) {
      return `Player ${winner} wins 🥳`;
    }
    if (!board.includes(null)) return ' It\'s a Draw'

    return `Player ${isNextX ? 'X' : 'O'} turn`

  }

  const resetGame = () => {
    setBoard(initialBoard);
  }

  const handleClick = (index: number) => {
    const winner = calculateWinner();
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isNextX ? 'X' : 'O';
    setBoard(newBoard);
    setIsNextX(!isNextX);

  }

  return { board, handleClick, resetGame, getStatusMessage }
}

export default useTictactoe;