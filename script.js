let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // خطوط أفقية
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // خطوط عمودية
        [0, 4, 8], [2, 4, 6]               // خطوط قطرية
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            message.textContent = `${currentPlayer} فاز!`;
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        message.textContent = 'تعادل!';
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameOver || board[index]) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();

    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `دور اللاعب ${currentPlayer}`;
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = 'دور اللاعب X';
}

message.addEventListener('click', () => {
    if (gameOver) resetGame();
});
