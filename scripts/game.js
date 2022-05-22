/*** CONSTANT ***/

document.addEventListener("DOMContentLoaded", () => {
  const COLS = 10;
  const ROWS = 20;
  const BLOCK_SIZE = 30;
  const COLOR_MAPPING = [
    "red",
    "orange",
    "green",
    "purple",
    "blue",
    "cyan",
    "yellow",
    "white",
  ];

  const WHITE_COLOR_ID = 7;

  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");

  ctx.canvas.width = COLS * BLOCK_SIZE;
  ctx.canvas.height = ROWS * BLOCK_SIZE;

  const BRICK_LAYOUT = [
    [
      [
        [1, 7, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 1],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 1, 7],
        [7, 1, 7],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [7, 1, 7],
        [7, 1, 1],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 1],
        [1, 1, 1],
        [7, 7, 7],
      ],
    ],
    [
      [
        [1, 7, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 1, 1],
        [1, 1, 7],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 7, 7],
        [7, 1, 1],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 7],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 7, 1],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 7],
        [7, 1, 1],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
      ],
      [
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 1, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
    ],
  ];

  const KEY_CODES = {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    UP: "ArrowUp",
  };

  const video = document.getElementById("music");
  video.src = "../sounds/clear.wav";

  class Board {
    constructor(ctx) {
      this.ctx = ctx;
      this.grid = this.generateWhiteBoard();
      this.drawBoard();
      this.score = 0;
      this.gameOver = false;
      this.isPlay = false;
    }

    reset() {
      this.grid = this.generateWhiteBoard();
      this.drawBoard();
      this.score = 0;
      this.gameOver = false;
      this.isPlay = true;
      generateNewBrick();
    }

    generateWhiteBoard() {
      return Array.from({ length: ROWS }, () =>
        Array(COLS).fill(WHITE_COLOR_ID)
      );
    }

    drawCell(x, y, colorId = WHITE_COLOR_ID) {
      this.ctx.fillStyle = COLOR_MAPPING[colorId];
      this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      this.ctx.fillStyle = "black";
      this.ctx.strokeRect(
        x * BLOCK_SIZE,
        y * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
      );
    }

    drawBoard() {
      for (let row = 0; row < ROWS; ++row) {
        for (let col = 0; col < COLS; ++col) {
          this.drawCell(col, row, this.grid[row][col]);
        }
      }
    }

    handleCompleteRows() {
      const latestGrid = board.grid.filter((row) => {
        return row.some((col) => col === WHITE_COLOR_ID);
      });

      const newScore = ROWS - latestGrid.length;
      const newRows = Array.from({ length: newScore }, () =>
        Array(COLS).fill(WHITE_COLOR_ID)
      );
      if (newScore) {
        board.grid = [...newRows, ...latestGrid];
        this.handleUpdateScore(this.score + newScore * 10);
        this.playMusic();
      }
    }

    playMusic() {
      video.play();
    }

    handleUpdateScore(newScore) {
      document.getElementById("score").innerHTML = newScore;
      this.score = newScore;
    }

    handleGameOver() {
      this.gameOver = true;
      this.isPlay = false;
      alert("Game Over");
    }
  }

  const board = new Board(ctx);

  class Brick {
    constructor(id) {
      this.id = id;
      this.layout = BRICK_LAYOUT[id];
      this.activeIndex = Math.floor(Math.random() * this.layout.length);
      this.colPos = 3;
      this.rowPos = -2;
    }

    draw(colorId) {
      for (let row = 0; row < this.layout[this.activeIndex].length; ++row) {
        for (
          let col = 0;
          col < this.layout[this.activeIndex][row].length;
          ++col
        ) {
          if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
            board.drawCell(
              col + this.colPos,
              row + this.rowPos,
              colorId ? colorId : this.id
            );
          }
        }
      }
    }

    moveLeft() {
      if (
        this.checlCollision(
          this.rowPos,
          this.colPos - 1,
          this.layout[this.activeIndex]
        )
      )
        return;

      this.draw(WHITE_COLOR_ID);
      this.colPos -= 1;
      this.draw();
    }
    moveRight() {
      if (
        this.checlCollision(
          this.rowPos,
          this.colPos + 1,
          this.layout[this.activeIndex]
        )
      )
        return;
      if (this.colPos < COLS) {
        this.draw(WHITE_COLOR_ID);
        this.colPos += 1;
        this.draw();
      }
    }
    moveDown() {
      if (
        this.checlCollision(
          this.rowPos + 1,
          this.colPos,
          this.layout[this.activeIndex]
        )
      ) {
        this.handleLanded();
        if (!board.gameOver) generateNewBrick();
        return;
      }
      this.draw(WHITE_COLOR_ID);
      ++this.rowPos;
      this.draw();
    }

    rotate() {
      if (
        this.checlCollision(
          this.rowPos,
          this.colPos,
          this.layout[(this.activeIndex + 1) % this.layout.length]
        )
      )
        return;
      this.draw(WHITE_COLOR_ID);
      ++this.activeIndex;
      this.activeIndex %= this.layout.length;
      this.draw();
    }

    checlCollision(nextRow, nextCol, nextLayout) {
      for (let row = 0; row < nextLayout.length; ++row) {
        for (let col = 0; col < nextLayout[row].length; ++col) {
          if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
            if (
              col + nextCol < 0 ||
              col + nextCol >= COLS ||
              row + nextRow >= ROWS ||
              board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
            )
              return true;
          }
        }
      }

      return false;
    }

    handleLanded() {
      if (this.rowPos <= 0) {
        board.handleGameOver();
        return;
      }

      for (let row = 0; row < this.layout[this.activeIndex].length; ++row) {
        for (
          let col = 0;
          col < this.layout[this.activeIndex][row].length;
          ++col
        ) {
          if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
            board.grid[row + this.rowPos][col + this.colPos] = this.id;
          }
        }
      }

      board.handleCompleteRows();
      board.drawBoard();
    }
  }

  let timerId;
  let testBrick;

  document.querySelector(".play-btn").addEventListener("click", () => {
    let isPlayAgain;

    if (board.isPlay) {
      if (window.confirm("Are you sure you want to play back?")) {
        isPlayAgain = true;
      }
    }

    if (!board.isPlay || isPlayAgain) {
      board.reset();
    }
  });

  function generateNewBrick() {
    if (timerId) clearInterval(timerId);
    testBrick = new Brick(Math.floor(Math.random() * BRICK_LAYOUT.length));

    timerId = setInterval(() => {
      if (!board.gameOver) {
        testBrick.moveDown();
      } else {
        clearInterval(timerId);
      }
    }, 100);
  }

  document.addEventListener("keyup", (e) => {
    if (!board.isPlay) return;
    const { LEFT, RIGHT, DOWN, UP } = KEY_CODES;

    if (e.code === UP) {
      testBrick.rotate();
    } else if (e.code === LEFT) {
      testBrick.moveLeft();
    } else if (e.code === RIGHT) {
      testBrick.moveRight();
    } else if (e.code === DOWN) testBrick.moveDown();
  });
});
