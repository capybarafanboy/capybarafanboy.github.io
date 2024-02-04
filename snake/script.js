document.addEventListener('DOMContentLoaded', () => {
  const boardSize = 20;
  const board = document.getElementById('game-board');
  const cells = [];

  let snake = [{ x: 10, y: 10 }];
  let direction = 'right';
  let food = generateFood();

  function createBoard() {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        board.appendChild(cell);
      }
    }
    // Draw snake and food initially
    drawSnake();
    drawFood();
  }

  function drawSnake() {
    snake.forEach(segment => {
      const index = segment.x + segment.y * boardSize;
      cells[index].classList.add('snake');
    });
  }

  function drawFood() {
    const index = food.x + food.y * boardSize;
    cells[index].classList.add('food');
  }

  function generateFood() {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    return { x, y };
  }

  function checkCollision() {
    const head = snake[0];
    return (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
  }

  function updateGame() {
    const head = { ...snake[0] };

    switch (direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = generateFood();
    } else {
      snake.pop();
    }

    if (checkCollision()) {
      alert('Game over!');
      resetGame();
    }

    // Clear the board and redraw
    cells.forEach(cell => cell.classList.remove('snake', 'food'));
    drawSnake();
    drawFood();
  }

  function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    food = generateFood();
    drawSnake();
    drawFood();
  }

  createBoard();
  setInterval(updateGame, 150);
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  });
});
