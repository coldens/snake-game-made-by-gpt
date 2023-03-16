const gameBoard = document.getElementById("game-board");
const cells = [];
for (let i = 0; i < 400; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cells.push(cell);
  gameBoard.appendChild(cell);
}

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let newDirection = { x: 0, y: -1 };
let snakeLength = 1;
let intervalId;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction.y === 0) newDirection = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && direction.y === 0) newDirection = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && direction.x === 0) newDirection = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && direction.x === 0) newDirection = { x: 1, y: 0 };
});

function getCell(x, y) {
  return cells[y * 20 + x];
}

function clearBoard() {
  cells.forEach((cell) => {
    cell.classList.remove("snake");
    cell.classList.remove("food");
  });
}

function drawSnake() {
  snake.forEach(({ x, y }) => {
    getCell(x, y).classList.add("snake");
  });
}

function drawFood() {
  getCell(food.x, food.y).classList.add("food");
}

function checkCollision() {
  const head = snake[0];
  const tail = snake.slice(1);
  return (
    head.x < 0 ||
    head.x >= 20 ||
    head.y < 0 ||
    head.y >= 20 ||
    tail.some((segment) => segment.x === head.x && segment.y === head.y)
  );
}

function saveHighScore(name, score) {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ name, score });
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10); // Keep the top 10 scores
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function endGame() {
  clearInterval(intervalId);
  const playerNameInput = document.getElementById("playerName");
  playerNameInput.value = "";
  $("#nameModal").modal("show");
}

function gameLoop() {
  direction = newDirection;
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (checkCollision()) {
    endGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    snakeLength++;
    food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } else {
    snake.pop();
  }

  clearBoard();
  drawSnake();
  drawFood();
}

document.getElementById("start-restart-button").addEventListener("click", () => {
  snake = [{ x: 10, y: 10 }];
  food = { x: 5, y: 5 };
  direction = { x: 0, y: 0 };
  newDirection = { x: 0, y: -1 };
  snakeLength = 1;
  clearInterval(intervalId);
  intervalId = setInterval(gameLoop, 100);
});

document.getElementById("saveScore").addEventListener("click", () => {
  const playerNameInput = document.getElementById("playerName");
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    saveHighScore(playerName, snakeLength);
    $("#nameModal").modal("hide");
  }
});
