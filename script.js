document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.board');
  const historyList = document.querySelector('.history-list');
  const blackClock = document.querySelector('.black-clock .time');
  const whiteClock = document.querySelector('.white-clock .time');
  const flipButton = document.getElementById('flip-board');
  const undoButton = document.getElementById('undo');
  const redoButton = document.getElementById('redo');
  const restartButton = document.getElementById('restart');
  const boardSize = 8;

  let currentPlayer = 'white';
  let selectedPiece = null;
  let whiteTime = 600;
  let blackTime = 600;
  let interval;
  let moveHistory = [];

  const pieces = {
    r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
    R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'
  };

  // Initialize board
  function initBoard() {
    board.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.row = i;
        square.dataset.col = j;

        if ((i + j) % 2 === 0) {
          square.style.backgroundColor = '#f0d9b5';
        } else {
          square.style.backgroundColor = '#b58863';
        }

        board.appendChild(square);
      }
    }
  }

  function startTimer() {
    interval = setInterval(() => {
      if (currentPlayer === 'white') {
        whiteTime--;
        if (whiteTime === 0) alert('Black wins!');
      } else {
        blackTime--;
        if (blackTime === 0) alert('White wins!');
      }
      updateClock();
    }, 1000);
  }

  function updateClock() {
    blackClock.textContent = formatTime(blackTime);
    whiteClock.textContent = formatTime(whiteTime);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  flipButton.addEventListener('click', () => {
    board.style.transform = board.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
  });

  restartButton.addEventListener('click', () => {
    whiteTime = blackTime = 600;
    updateClock();
    initBoard();
  });

  initBoard();
  updateClock();
  startTimer();
});
