const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("scoreboard");
const timerElement = document.getElementById("timer");

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 32;
const VACANT = "black"; // color of an empty square

// draw a square
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create the board
let board = [];
for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// draw the board
function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

// the pieces and their colors
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

// generate random pieces
function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length); // 0 -> 6
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p;

// The Object Piece
function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; // we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // we need to control the pieces
    this.x = 3;
    this.y = -2;
}

// fill function
Piece.prototype.fill = function(color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            // we draw only occupied squares
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// draw a piece to the board
Piece.prototype.draw = function() {
    this.fill(this.color);
}

// undraw a piece
Piece.prototype.unDraw = function() {
    this.fill(VACANT);
}

// draw the ghost piece
Piece.prototype.drawGhost = function() {
    const ghostColor = 'rgba(255, 255, 255, 0.2)'; // light color with transparency
    let ghostY = this.y;

    // Find the position where the piece would land
    while (!this.collision(0, 1, this.activeTetromino, ghostY + 1)) {
        ghostY++;
    }

    // Draw the ghost piece
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, ghostY + r, ghostColor);
            }
        }
    }
}

// move Down the piece
Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        draw(); // Update the draw function to include the ghost piece
    } else {
        // we lock the piece and generate a new one
        this.lock();
        if (!gameOver) {
            p = randomPiece();
        }
    }
}

// move Right the piece
Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        draw(); // Update the draw function to include the ghost piece
    }
}

// move Left the piece
Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        draw(); // Update the draw function to include the ghost piece
    }
}

// rotate the piece
Piece.prototype.rotate = function() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COL / 2) {
            // it's the right wall
            kick = -1; // we need to move the piece to the left
        } else {
            // it's the left wall
            kick = 1; // we need to move the piece to the right
        }
    }

    if (!this.collision(kick, 0, nextPattern)) {
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = nextPattern;
        draw(); // Update the draw function to include the ghost piece
    }
}

let score = 0;

// Modify the lock function to show the game over screen
Piece.prototype.lock = function() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            if (this.y + r < 0) {
                gameOver = true;
                document.getElementById("gameOverScreen").style.display = "flex";
                return;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
    for (let r = 0; r < ROW; r++) {
        let isRowFull = true;
        for (let c = 0; c < COL; c++) {
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }
        if (isRowFull) {
            for (let y = r; y > 1; y--) {
                for (let c = 0; c < COL; c++) {
                    board[y][c] = board[y - 1][c];
                }
            }
            for (let c = 0; c < COL; c++) {
                board[0][c] = VACANT;
            }
            score += 10;
        }
    }
    drawBoard();
    scoreElement.innerHTML = score;
}

// collision function
Piece.prototype.collision = function(x, y, piece, newY = this.y + y) {
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece.length; c++) {
            // if the square is empty, we skip it
            if (!piece[r][c]) {
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let testY = newY + r;

            // conditions
            if (newX < 0 || newX >= COL || testY >= ROW) {
                return true;
            }
            // skip newY < 0; board[-1] will crash our game
            if (testY < 0) {
                continue;
            }
            // check if there is a locked piece already in place
            if (board[testY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}

// CONTROL the piece
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
    if (gameOver) return;
    if (event.keyCode == 39) {
        p.moveLeft();
    } else if (event.keyCode == 40) {
        p.rotate();
    } else if (event.keyCode == 37) {
        p.moveRight();
    } else if (event.keyCode == 38) {
        p.moveDown();
    } else if (event.keyCode == 32) { // Check if spacebar is pressed
        while (!p.collision(0, 1, p.activeTetromino)) { // Move down until collision
            p.moveDown();
        }
        p.lock(); // Lock the tetromino in place
        scoreElement.innerHTML = score; // Update the score display
        if (!gameOver) {
            p = randomPiece(); // Generate a new tetromino
        }
    }
}

let dropStart = Date.now();
let gameOver = false;

function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 500) {
        if (!gameOver) {
            p.moveDown();
        }
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

function initGame() {
    // Reset game variables
    score = 0;
    gameOver = false;
    scoreElement.innerHTML = score;

    // Reset the board
    board = [];
    for (let r = 0; r < ROW; r++) {
        board[r] = [];
        for (let c = 0; c < COL; c++) {
            board[r][c] = VACANT;
        }
    }

    drawBoard();
    p = randomPiece();
    drop();
}

function retryGame() {
    document.getElementById("gameOverScreen").style.display = "none";
    initGame();
}

initGame();

function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height); // Clear the canvas
    drawBoard();
    p.drawGhost(); // Draw the ghost piece
    p.draw(); // Draw the main piece
}