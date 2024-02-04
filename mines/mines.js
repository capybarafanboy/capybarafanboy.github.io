const boardSize = 10;
const mineCount = 20;
let board = [];
let flaggedCells = new Set();

function createBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = {
        isMine: false,
        isOpen: false,
        count: 0,
      };
    }
  }

  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);

    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate mine counts for each cell
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j].isMine) {
        board[i][j].count = countSurroundingMines(i, j);
      }
    }
  }
}

function countSurroundingMines(x, y) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newX = x + i;
      const newY = y + j;

      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].isMine) {
        count++;
      }
    }
  }

  return count;
}

function openCell(x, y) {
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y].isOpen) {
    return;
  }

  board[x][y].isOpen = true;

  if (board[x][y].isMine) {
    // Game over
    revealBoard();
    alert('Game Over! You hit a mine.');
    resetBoard();
  } else if (checkWin()) {
    alert('Congratulations! You won!');
    resetBoard();
  } else if (board[x][y].count === 0) {
    // Open surrounding cells if count is 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        openCell(x + i, y + j);
      }
    }
  }

  renderBoard();
}

function toggleFlag(x, y) {
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y].isOpen) {
    return;
  }

  const cellKey = `${x}-${y}`;

  if (flaggedCells.has(cellKey)) {
    flaggedCells.delete(cellKey);
  } else {
    flaggedCells.add(cellKey);
  }

  renderBoard();
}

function checkWin() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j].isMine && !board[i][j].isOpen) {
        return false;
      }
    }
  }
  return true;
}

function revealBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      board[i][j].isOpen = true;
    }
  }
}

function resetBoard() {
  board = [];
  flaggedCells.clear();
  createBoard();
  renderBoard();
}

function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = board[i][j].isOpen
        ? board[i][j].isMine
          ? '💣'
          : board[i][j].count || ''
        : flaggedCells.has(`${i}-${j}`)
        ? '🚩'
        : '';
      cellElement.addEventListener('click', () => openCell(i, j));
      cellElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        toggleFlag(i, j);
      });

      if (board[i][j].isOpen && board[i][j].isMine) {
        cellElement.classList.add('mine');
      } else if (board[i][j].isOpen) {
        cellElement.classList.add('opened');
      }

      boardElement.appendChild(cellElement);
    }
  }
}

createBoard();
renderBoard();
