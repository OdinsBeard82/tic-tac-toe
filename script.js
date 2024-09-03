const gameBoard = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
};

let currentPlayerIndex = 0;

function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

const player1Button = document.querySelector('.player1');
const player2Button = document.querySelector('.player2');
const restartButton = document.querySelector('.restart');
const cells = document.querySelectorAll('.cell');

const winningSelections = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayers = [];

function addPlayerToGame(name, symbol) {
  const newPlayer = new Player(name, symbol);
  currentPlayers.push(newPlayer);
}

function startGame() {
  const player1Name = document.getElementById('player1').value;
  const player2Name = document.getElementById('player2').value;

  if (player1Name !== '' && player2Name !== '') {
    addPlayerToGame(player1Name, 'X');
    addPlayerToGame(player2Name, 'O');
  }
}


document.getElementById('start-button').addEventListener('click', startGame);

function selectPlayer(event) {
  const selectedPlayer = event.target.classList[0];
  if (selectedPlayer === 'player1') {
    currentPlayerIndex = 0;
  } else if (selectedPlayer === 'player2') {
    currentPlayerIndex = 1;
  }
}

function addSymbolToBoard(event) {
  const selectedCell = event.target;
  const rowIndex = selectedCell.getAttribute('data-row');
  const colIndex = selectedCell.getAttribute('data-col');
  const currentPlayer = currentPlayers[currentPlayerIndex];

  if (gameBoard.board[rowIndex][colIndex] === '') {
    gameBoard.board[rowIndex][colIndex] = currentPlayer.symbol;
    selectedCell.textContent = currentPlayer.symbol;
    currentPlayerIndex = (currentPlayerIndex + 1) % currentPlayers.length;

    if (CheckForWin()) {
      cells.forEach(cell => cell.removeEventListener('click', addSymbolToBoard));
    }
  }
}

function CheckForWin() {
  let filledCells = 0;

  for (let win of winningSelections) {
    if (cells[win[0]].textContent === cells[win[1]].textContent &&
      cells[win[1]].textContent === cells[win[2]].textContent &&
      cells[win[0]].textContent !== '') {

      const winnerSymbol = cells[win[0]].textContent;
      const winner = currentPlayers.find(player => player.symbol === winnerSymbol).name || `Player ${winnerSymbol}`;
      const congratulationMsg = `Congratulations ${winner}! You won!`;
      const winningMsg = document.createElement('p');
      winningMsg.textContent = congratulationMsg;
      document.body.appendChild(winningMsg);
      return true;
    }
  }

  for (let cell of cells) {
    if (cell.textContent !== '') {
      filledCells++;
    }
  }

  if (filledCells === cells.length) {
    const congratulationMsg = `It's a tie!`;
    const winningMsg = document.createElement('p');
    winningMsg.textContent = congratulationMsg;
    document.body.appendChild(winningMsg);
    return true;
  }

  return false;
}

function restartGame() {
  gameBoard.board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  cells.forEach(cell => cell.textContent = '');
  currentPlayerIndex = 0;
  cells.forEach(cell => cell.addEventListener('click', addSymbolToBoard));
}

player1Button.addEventListener('click', selectPlayer);
player2Button.addEventListener('click', selectPlayer);
cells.forEach(cell => cell.addEventListener('click', addSymbolToBoard));
restartButton.addEventListener('click', restartGame);
